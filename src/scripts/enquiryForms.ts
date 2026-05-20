type FormSource = 'quote' | 'contact' | 'commercial';

const ENDPOINT = '/.netlify/functions/submit-enquiry';
function fieldsFromForm(form: HTMLFormElement) {
	const data = new FormData(form);
	const fields: Record<string, string> = {};
	for (const [key, value] of data.entries()) {
		if (typeof value === 'string') fields[key] = value;
	}
	return fields;
}

async function fireConfetti() {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	try {
		const { default: confetti } = await import('canvas-confetti');
		confetti({
			particleCount: 110,
			spread: 72,
			startVelocity: 34,
			origin: { y: 0.62 },
			colors: ['#0f4ac4', '#2563eb', '#f59e0b', '#22c55e', '#ffffff'],
		});
		setTimeout(() => {
			confetti({
				particleCount: 60,
				angle: 60,
				spread: 55,
				origin: { x: 0, y: 0.65 },
				colors: ['#0f4ac4', '#22c55e', '#f59e0b'],
			});
			confetti({
				particleCount: 60,
				angle: 120,
				spread: 55,
				origin: { x: 1, y: 0.65 },
				colors: ['#0f4ac4', '#22c55e', '#f59e0b'],
			});
		}, 180);
	} catch {
		/* confetti is optional enhancement */
	}
}

function showSuccess(shell: HTMLElement) {
	const form = shell.querySelector('form');
	const success = shell.querySelector('.enquiry-form-success');
	const error = shell.querySelector('.enquiry-form-error');

	if (form) form.hidden = true;
	if (error) {
		error.hidden = true;
		error.textContent = '';
	}
	if (success) {
		success.hidden = false;
		const focusTarget = success.querySelector('button, [tabindex="0"]') ?? success;
		if (focusTarget instanceof HTMLElement) focusTarget.focus();
	}

	void fireConfetti();
}

function showError(shell: HTMLElement, message: string) {
	const error = shell.querySelector('.enquiry-form-error');
	if (!error) return;
	error.textContent = message;
	error.hidden = false;
}

function setSubmitting(form: HTMLFormElement, isSubmitting: boolean) {
	const button = form.querySelector('button[type="submit"]');
	if (!(button instanceof HTMLButtonElement)) return;
	if (!button.dataset.defaultLabel) button.dataset.defaultLabel = button.textContent ?? 'Submit';
	button.disabled = isSubmitting;
	button.textContent = isSubmitting ? 'Sending…' : button.dataset.defaultLabel;
}

function bindForm(form: HTMLFormElement) {
	const source = form.dataset.formSource as FormSource | undefined;
	if (!source) return;

	const shell = form.closest('.enquiry-form-shell');
	if (!shell || !(shell instanceof HTMLElement)) return;

	form.addEventListener('submit', async (event) => {
		event.preventDefault();
		if (!form.reportValidity()) return;

		setSubmitting(form, true);
		const error = shell.querySelector('.enquiry-form-error');
		if (error) {
			error.hidden = true;
			error.textContent = '';
		}

		try {
			const response = await fetch(ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					source,
					fields: fieldsFromForm(form),
				}),
			});

			const result = (await response.json().catch(() => ({}))) as {
				ok?: boolean;
				message?: string;
			};

			if (!response.ok || !result.ok) {
				showError(shell, result.message ?? 'Something went wrong. Please try again or call us.');
				return;
			}

			showSuccess(shell);
			shell.dispatchEvent(new CustomEvent('enquiry-success', { bubbles: true }));
		} catch {
			showError(shell, 'Network error, please check your connection or call us directly.');
		} finally {
			setSubmitting(form, false);
		}
	});
}

function initEnquiryForms() {
	document.querySelectorAll<HTMLFormElement>('form[data-enquiry-form]').forEach((form) => {
		if (form.dataset.enquiryReady === 'true') return;
		form.dataset.enquiryReady = 'true';
		bindForm(form);
	});
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initEnquiryForms, { once: true });
} else {
	initEnquiryForms();
}

document.addEventListener('astro:page-load', initEnquiryForms);
