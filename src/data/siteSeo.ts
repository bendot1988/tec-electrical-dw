export const siteUrl = 'https://tecservicesltd.com';

export const siteName = 'Tec Electrical';

export const legalName = 'Tec Electrical Services Ltd';

export const defaultOgImage = '/og-image.png';

export const defaultOgImageWidth = 1200;

export const defaultOgImageHeight = 630;

/** Preferred canonical URL: https, no trailing slash */
export function getCanonicalUrl(pathname: string): string {
	let path = pathname || '/';
	if (path !== '/' && path.endsWith('/')) {
		path = path.slice(0, -1);
	}
	if (path === '/') return siteUrl;
	return new URL(path, siteUrl).href;
}

export function absoluteUrl(path: string): string {
	const normalized = path.startsWith('/') ? path : `/${path}`;
	return new URL(normalized, siteUrl).href;
}
