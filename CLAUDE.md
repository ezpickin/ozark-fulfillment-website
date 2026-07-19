# Ozark Fulfillment Website — Claude Project Guide

Marketing website for Ozark Fulfillment, a 3PL warehouse in Houston, MO. Owner: Trevor Morris (trevor@ozarkfulfillment.com).

## Hard rules (never violate)

- **Never name the WMS publicly.** The company uses JASCI, but all public copy must say "AI-integrated WMS" (or similar) — never the product name.
- **Never name clients on the site** (e.g., MBM, Ezpickin). Social proof is platform integrations only: Amazon Seller Central, Shopify, TikTok Shop, Walmart Marketplace, "+ many others".
- **Never touch MX/TXT DNS records** for ozarkfulfillment.com — company email runs on them. Only the A records (@ → GitHub Pages) and the www CNAME belong to the website.

## Stack & architecture

- **Astro 5** static site, single scrolling page (`src/pages/index.astro`).
- Each section is a self-contained component in `src/components/` (Header, Hero, Services, WhyUs, Integrations, QuoteForm, Footer) so sections can later become standalone pages.
- Shared palette/typography: `src/styles/global.css` (CSS custom properties, derived from the badge logo: navy `#142438/#1b3252`, sky `#a9d2e8`, green `#3a7d3a`, water `#2170b8`, silver `#c6ccd4`).
- The logo (`public/logo.png`) has a white margin around a circular badge — display it inside `.logo-badge` (circular crop + `scale(1.12)`).
- **Quote form**: posts to Web3Forms → trevor@ozarkfulfillment.com. Access key lives in `src/components/QuoteForm.astro` (`WEB3FORMS_ACCESS_KEY`).

## Hosting & deployment

- **GitHub Pages** (user explicitly chose it over Vercel — no backend needed).
- Deploys via GitHub Action (`.github/workflows/deploy.yml`, uses `withastro/action`) on push to `main`.
- Custom domain: `public/CNAME` contains `ozarkfulfillment.com`; GoDaddy DNS A records point to GitHub Pages IPs.

## Commands

- `npm run dev` — local dev server (default http://localhost:4321)
- `npm run build` — static build to `dist/`
- `npm run preview` — serve the built site locally

## Contact facts (safe to show publicly)

1475 S Sam Houston Blvd, Houston, MO 65483 · (417) 453-1005 · trevor@ozarkfulfillment.com

See `LESSONS.md` for the running lessons-learned log.
