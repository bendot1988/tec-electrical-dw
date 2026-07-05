const MIN_SUBMIT_MS = Number(process.env.FORM_MIN_SUBMIT_MS ?? 3000);
const RATE_LIMIT_WINDOW_MS = Number(process.env.FORM_RATE_LIMIT_WINDOW_MS ?? 60 * 60 * 1000);
const RATE_LIMIT_MAX = Number(process.env.FORM_RATE_LIMIT_MAX ?? 5);

const COMMERCIAL_GIBBERISH_FIELDS = ['contactName', 'businessName', 'projectSummary'];

/** @type {Map<string, number[]>} */
const rateLimitHits = new Map();

export function getClientIp(event) {
	const forwarded = event.headers['x-forwarded-for'] ?? event.headers['X-Forwarded-For'];
	if (typeof forwarded === 'string' && forwarded.length > 0) {
		return forwarded.split(',')[0].trim();
	}
	return event.headers['client-ip'] ?? event.headers['x-nf-client-connection-ip'] ?? 'unknown';
}

export function readRawFields(payload) {
	if (!payload?.fields || typeof payload.fields !== 'object' || Array.isArray(payload.fields)) {
		return {};
	}
	return payload.fields;
}

export function isHoneypotTripped(rawFields) {
	const honeypot = rawFields._honeypot;
	return typeof honeypot === 'string' && honeypot.trim().length > 0;
}

export function isSubmittedTooFast(rawFields, minMs = MIN_SUBMIT_MS) {
	const loadedAt = Number(rawFields._loadedAt);
	if (!Number.isFinite(loadedAt) || loadedAt <= 0) return true;
	return Date.now() - loadedAt < minMs;
}

export function isRateLimited(ip, { windowMs = RATE_LIMIT_WINDOW_MS, max = RATE_LIMIT_MAX } = {}) {
	const key = ip || 'unknown';
	const now = Date.now();
	const recent = (rateLimitHits.get(key) ?? []).filter((timestamp) => now - timestamp < windowMs);

	if (recent.length >= max) {
		rateLimitHits.set(key, recent);
		return true;
	}

	recent.push(now);
	rateLimitHits.set(key, recent);
	return false;
}

export async function verifyTurnstileToken(token, ip) {
	const secret = process.env.TURNSTILE_SECRET_KEY;
	if (!secret) return true;

	if (typeof token !== 'string' || token.trim().length === 0) return false;

	const body = new URLSearchParams({
		secret,
		response: token.trim(),
	});
	if (ip && ip !== 'unknown') body.set('remoteip', ip);

	const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body,
	});

	if (!response.ok) return false;

	const result = await response.json().catch(() => ({}));
	return result.success === true;
}

function gibberishScore(text, { minLetters = 4 } = {}) {
	const value = String(text ?? '').trim();
	if (value.length < 6) return 0;

	const letters = value.replace(/[^a-zA-Z]/g, '');
	if (letters.length < minLetters) return 0;

	let score = 0;
	const vowels = (letters.match(/[aeiouAEIOU]/g) ?? []).length;
	const vowelRatio = vowels / letters.length;

	if (vowelRatio < 0.18) score += 2;
	if (vowelRatio > 0.78 && letters.length > 12) score += 1;
	if (/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]{6,}/.test(letters)) score += 2;
	if (/(.)\1{3,}/.test(value)) score += 2;
	if (value.length > 32 && !/\s/.test(value)) score += 1;
	if (/qwerty|asdfgh|zxcvbn|qazwsx|password|test@test/i.test(value)) score += 3;

	return score;
}

export function hasGibberish(fields) {
	return COMMERCIAL_GIBBERISH_FIELDS.some((key) => {
		const minLetters = key === 'projectSummary' ? 6 : 4;
		const threshold = key === 'projectSummary' ? 2 : 2;
		return gibberishScore(fields[key], { minLetters }) >= threshold;
	});
}

/**
 * @param {{ rawFields: Record<string, unknown>, fields: Record<string, string>, turnstileToken?: unknown, ip: string }} input
 */
export async function evaluateCommercialAntiSpam({ rawFields, fields, turnstileToken, ip }) {
	/** @type {string[]} */
	const reasons = [];

	if (isHoneypotTripped(rawFields)) reasons.push('honeypot');
	if (isSubmittedTooFast(rawFields)) reasons.push('timing');
	if (isRateLimited(ip)) reasons.push('rate_limit');
	if (!(await verifyTurnstileToken(turnstileToken, ip))) reasons.push('turnstile');
	if (hasGibberish(fields)) reasons.push('gibberish');

	return { flagged: reasons.length > 0, reasons };
}
