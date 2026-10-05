import {
	evaluateCommercialAntiSpam,
	getClientIp,
	isHoneypotTripped,
	readRawFields,
} from './lib/antiSpam.mjs';
import { buildEnquiryEmail } from './lib/buildEnquiryEmail.mjs';
import {
	connectBlobs,
	markLeadEmail,
	notifyPhone,
	saveLeadBackup,
	submitNetlifyForm,
} from '../../src/utils/lead-backup.ts';

const ALLOWED_SOURCES = new Set(['quote', 'contact', 'commercial']);

/** Must match the hidden forms in public/netlify-forms.html. */
const NETLIFY_FORMS = {
	quote: { name: 'quote-enquiry', fields: ['name', 'phone', 'postcode', 'job'] },
	contact: {
		name: 'contact-enquiry',
		fields: ['name', 'email', 'phone', 'postcode', 'service', 'property_type', 'message', 'consent_legal'],
	},
	commercial: {
		name: 'commercial-enquiry',
		fields: ['contactName', 'businessName', 'businessType', 'email', 'phone', 'projectSummary', 'consent_legal'],
	},
};

const RESEND_TIMEOUT_MS = 5000;

function jsonResponse(statusCode, body) {
	return {
		statusCode,
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'no-store',
		},
		body: JSON.stringify(body),
	};
}

function sanitizeFields(raw) {
	if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
	const fields = {};
	for (const [key, value] of Object.entries(raw)) {
		if (typeof key !== 'string' || key.startsWith('_')) continue;
		if (typeof value === 'string') fields[key] = value.trim().slice(0, 8000);
	}
	return fields;
}

function getReplyTo(fields, source) {
	if (source === 'contact' || source === 'commercial') {
		const email = fields.email;
		if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return email;
	}
	return undefined;
}

function parseBccList() {
	const raw = process.env.FORM_BCC_EMAILS ?? 'ben@dotwall.co.uk';
	return raw
		.split(',')
		.map((entry) => entry.trim())
		.filter(Boolean);
}

export const handler = async (event) => {
	if (event.httpMethod === 'OPTIONS') {
		return {
			statusCode: 204,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Allow-Methods': 'POST, OPTIONS',
			},
			body: '',
		};
	}

	if (event.httpMethod !== 'POST') {
		return jsonResponse(405, { ok: false, message: 'Method not allowed' });
	}

	let payload;
	try {
		payload = JSON.parse(event.body ?? '{}');
	} catch {
		return jsonResponse(400, { ok: false, message: 'Invalid request body.' });
	}

	const source = String(payload.source ?? '').trim();
	if (!ALLOWED_SOURCES.has(source)) {
		return jsonResponse(400, { ok: false, message: 'Unknown form source.' });
	}

	const rawFields = readRawFields(payload);
	const fields = sanitizeFields(rawFields);

	if (isHoneypotTripped(rawFields)) {
		return jsonResponse(200, { ok: true });
	}

	if (source === 'quote') {
		if (!fields.name || !fields.phone || !fields.postcode || !fields.job) {
			return jsonResponse(400, { ok: false, message: 'Please complete all required fields.' });
		}
	} else if (source === 'contact') {
		if (
			!fields.name ||
			!fields.email ||
			!fields.phone ||
			!fields.postcode ||
			!fields.service ||
			!fields.property_type ||
			!fields.message
		) {
			return jsonResponse(400, { ok: false, message: 'Please complete all required fields.' });
		}
	} else if (source === 'commercial') {
		if (
			!fields.contactName ||
			!fields.businessName ||
			!fields.businessType ||
			!fields.email ||
			!fields.phone ||
			!fields.projectSummary
		) {
			return jsonResponse(400, { ok: false, message: 'Please complete all required fields.' });
		}

		const antiSpam = await evaluateCommercialAntiSpam({
			rawFields,
			fields,
			turnstileToken: payload.turnstileToken,
			ip: getClientIp(event),
		});

		if (antiSpam.flagged) {
			console.warn('Commercial enquiry silently rejected', antiSpam.reasons);
			return jsonResponse(200, { ok: true });
		}
	}

	const netlifyForm = NETLIFY_FORMS[source];
	const leadData = { ...fields };
	delete leadData['cf-turnstile-response'];

	connectBlobs(event);
	const backup = await saveLeadBackup(netlifyForm.name, leadData);

	const toEmail = process.env.FORM_TO_EMAIL ?? 'info@tecservicesltd.com';
	const fromEmail =
		process.env.RESEND_FROM_EMAIL ?? 'Tec Electrical <enquiries@tecservicesltd.com>';
	const bcc = parseBccList();
	const { subject, html } = buildEnquiryEmail({ source, fields });
	const replyTo = getReplyTo(fields, source);

	const emailPayload = {
		from: fromEmail,
		to: [toEmail],
		bcc,
		subject,
		html,
		...(replyTo ? { reply_to: replyTo } : {}),
	};

	let emailOk = false;
	let emailError = '';
	let emailId = null;
	try {
		const apiKey = process.env.RESEND_API_KEY;
		if (!apiKey) throw new Error('RESEND_API_KEY is not configured');

		const resendResponse = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(emailPayload),
			signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
		});

		const result = await resendResponse.json().catch(() => ({}));
		if (!resendResponse.ok) {
			throw new Error(`Resend ${resendResponse.status}: ${JSON.stringify(result).slice(0, 200)}`);
		}
		emailOk = true;
		emailId = result.id ?? null;
	} catch (err) {
		emailError = err instanceof Error ? err.message : String(err);
		console.error('Resend error', emailError);
	}

	let netlifyFormOk = false;
	if (!emailOk) {
		const formFields = { subject: `Backup email: ${subject}`, email_error: emailError };
		for (const key of netlifyForm.fields) {
			if (leadData[key]) formFields[key] = leadData[key];
		}
		netlifyFormOk = await submitNetlifyForm(netlifyForm.name, formFields);
	}

	await markLeadEmail(
		backup,
		emailOk ? 'sent' : 'failed',
		emailOk ? undefined : `${emailError} | Netlify Forms backup: ${netlifyFormOk ? 'sent' : 'failed'}`,
	);
	await notifyPhone(netlifyForm.name, emailOk);

	if (!emailOk && !backup && !netlifyFormOk) {
		return jsonResponse(502, {
			ok: false,
			message: 'We could not send your enquiry right now. Please call us instead.',
		});
	}

	return jsonResponse(200, { ok: true, id: emailId });
};
