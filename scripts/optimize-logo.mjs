// Regenerates the small logo files in public/ from the full-size public/logo.png.
// Run with: node scripts/optimize-logo.mjs   (only needed if the logo artwork changes)
//
// public/logo.png stays as the 1024px original — it is used only for social sharing
// (og:image) and structured data, never loaded by visitors' browsers.
import sharp from 'sharp';

const SRC = 'public/logo.png';

// On-page logo: WebP at the two sizes the site displays (2x for sharp screens).
for (const size of [128, 640]) {
  await sharp(SRC).resize(size).webp({ quality: 82 }).toFile(`public/logo-${size}.webp`);
}

// Favicon: crop the white margin off the badge and mask it to a circle.
const { width } = await sharp(SRC).metadata();
const inner = Math.round(width / 1.12); // same crop the .logo-badge CSS applies
const offset = Math.round((width - inner) / 2);
const FAV = 64;
const circle = Buffer.from(
  `<svg width="${FAV}" height="${FAV}"><circle cx="${FAV / 2}" cy="${FAV / 2}" r="${FAV / 2}"/></svg>`
);
await sharp(SRC)
  .extract({ left: offset, top: offset, width: inner, height: inner })
  .resize(FAV)
  .composite([{ input: circle, blend: 'dest-in' }])
  .png()
  .toFile('public/favicon.png');

// iOS home-screen icon: square, opaque background.
await sharp(SRC)
  .resize(180)
  .flatten({ background: '#ffffff' })
  .png()
  .toFile('public/apple-touch-icon.png');

console.log('Logo assets regenerated in public/.');
