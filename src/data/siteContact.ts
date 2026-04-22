/** Public contact details — single source for header, footer, CTAs */
export const siteContact = {
	email: 'hello@tecservicesltd.com',
	telHref: 'tel:+441162352999',
	telDisplay: '0116 235 2999',
	mobileHref: 'tel:+447736323078',
	mobileDisplay: '07736 323078',
	whatsappHref: 'https://wa.me/447736323078',
	addressLine1: '6 Long Cl, Anstey, Leicester',
	postcode: 'LE7 7QN',
	get addressFull() {
		return `${this.addressLine1} ${this.postcode}`;
	},
} as const;
