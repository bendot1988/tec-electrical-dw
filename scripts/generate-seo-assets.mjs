import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

await mkdir('public', { recursive: true });

await sharp('public/hero-electrical-services.png')
	.resize(1200, 630, { fit: 'cover', position: 'centre' })
	.png({ quality: 88 })
	.toFile('public/og-image.png');

await sharp('public/favicon.png')
	.resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
	.png()
	.toFile('public/favicon-32.png');

await sharp('public/favicon.png')
	.resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
	.png()
	.toFile('public/apple-touch-icon.png');

console.log('Generated og-image.png, favicon-32.png, apple-touch-icon.png');
