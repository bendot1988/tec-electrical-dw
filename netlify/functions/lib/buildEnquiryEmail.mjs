const SITE_URL = 'https://tecservicesltd.com';
const ICON_URL = `${SITE_URL}/favicon.png`;

const SOURCE_LABELS = {
	quote: 'Quick quote enquiry',
	contact: 'Contact page enquiry',
	commercial: 'Commercial electrical enquiry',
};

function escapeHtml(value) {
	return String(value ?? '')
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

function formatFieldLabel(key) {
	return key
		.replaceAll('_', ' ')
		.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * @param {{ source: string, fields: Record<string, string> }} payload
 */
export function buildEnquiryEmail({ source, fields }) {
	const sourceLabel = SOURCE_LABELS[source] ?? 'Website enquiry';
	const rows = Object.entries(fields)
		.filter(([, value]) => String(value ?? '').trim().length > 0)
		.map(
			([key, value]) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;width:34%;vertical-align:top;">
            ${escapeHtml(formatFieldLabel(key))}
          </td>
          <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:14px;line-height:1.5;vertical-align:top;">
            ${escapeHtml(value).replaceAll('\n', '<br />')}
          </td>
        </tr>`,
		)
		.join('');

	const submitterName = fields.name || fields.contactName || 'Website visitor';
	const subject = `New ${sourceLabel}, ${submitterName}`;

	const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f1f5f9;font-family:Inter,Arial,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f1f5f9;padding:28px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #dbe1eb;box-shadow:0 18px 40px -28px rgba(15,23,42,0.28);">
            <tr>
              <td style="padding:24px 28px;background:linear-gradient(102deg,#0a1f4d 0%,#0f4ac4 52%,#0c3d9e 100%);">
                <img src="${ICON_URL}" alt="Tec Electrical" width="56" height="56" style="display:block;width:56px;height:56px;border-radius:50%;" />
                <p style="margin:14px 0 0;color:rgba(248,250,252,0.92);font-size:14px;line-height:1.5;">
                  New enquiry from <strong style="color:#fff;">tecservicesltd.com</strong>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px 8px;">
                <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#0f4ac4;">
                  ${escapeHtml(sourceLabel)}
                </p>
                <h1 style="margin:0 0 18px;font-size:22px;line-height:1.25;color:#0f172a;">
                  ${escapeHtml(submitterName)} submitted an enquiry
                </h1>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
                  ${rows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 28px 26px;">
                <p style="margin:0;font-size:12px;line-height:1.55;color:#64748b;">
                  Reply directly to this message if a reply-to address was provided. Submitted at
                  ${escapeHtml(new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }))} (UK time).
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

	return { subject, html };
}
