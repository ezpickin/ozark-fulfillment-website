# Ozark Fulfillment Website — Claude Project Guide

Marketing website for Ozark Fulfillment, a 3PL warehouse in Houston, MO. Owner: Trevor Morris (trevor@ozarkfulfillment.com).

## Hard rules (never violate)

- **Never name the WMS publicly.** The company uses JASCI, but all public copy must say "AI-integrated WMS" (or similar) — never the product name.
- **Never name clients on the site** (e.g., MBM, Ezpickin). Social proof is platform integrations only: Amazon Seller Central, Shopify, TikTok Shop, Walmart Marketplace, "+ many others". (Note: the GitHub account is named `ezpickin` — that's a separate client brand; keep it out of site copy.)
- **Never touch MX/TXT DNS records** for ozarkfulfillment.com — company email runs on them. Only the A records (@ → GitHub Pages) and the www CNAME belong to the website.

## Stack & architecture

- **Astro 5** static site. Two pages: the single scrolling home page (`src/pages/index.astro`) and a Privacy Policy (`src/pages/privacy.astro`).
- `src/layouts/Layout.astro` — shared `<head>` (meta, OpenGraph, LocalBusiness JSON-LD). Accepts optional `title`/`description` props (home page uses defaults; privacy page overrides them).
- Home-page section components in `src/components/`, assembled in this order: `Header` → `Hero` → `Stats` → `Services` → `WhyUs` → `About` → `Integrations` → `QuoteForm` → `Footer`. Each is self-contained so a section can later become its own page.
- Shared palette/typography: `src/styles/global.css` (CSS custom properties, derived from the badge logo: navy `#142438/#1b3252`, sky `#a9d2e8`, green `#3a7d3a`, water `#2170b8`, silver `#c6ccd4`). Font is the **system font stack** (Segoe UI / system-ui) — user considered Manrope+Inter but chose to keep the system font for readability.
- The logo (`public/logo.png`) has a white margin around a circular badge — display it inside `.logo-badge` (circular crop + `scale(1.12)`).
- **Service card icons** are inline SVG (Feather-style stroke icons) stored as `svg` strings in the `services` array in `Services.astro`, rendered via `set:html` — NOT emoji (emoji were replaced for a more professional look).
- **Stats strip** (`Stats.astro`): 4 tiles — 65,000 sq ft total · 9,000 sq ft climate-controlled · Same-Day (fulfillment by 12 PM CT) · 250,000+ units/yr. (A previous "99% order accuracy" tile was removed — a precise, below-industry-standard number that invited scrutiny.)
- **About** (`About.astro`): copy sourced from the company's LinkedIn profile.
- **Footer** (`Footer.astro`): address, phone, email, business hours (Mon–Fri 8:00 AM–4:30 PM CT), LinkedIn + Facebook icon links, and a Privacy Policy link.
- **Quote form** (`QuoteForm.astro`): posts to Web3Forms → trevor@ozarkfulfillment.com. Live access key `b1771689-1b3b-457b-9176-e8cd5458f9fb` is set in the `<script>` (`WEB3FORMS_ACCESS_KEY`). Honeypot spam field `botcheck`. Verified working (submissions land in the inbox).

## Hosting & deployment

- **GitHub Pages** (user explicitly chose it over Vercel — no backend needed).
- Repo: **github.com/ezpickin/ozark-fulfillment-website** (public). GitHub account is `ezpickin`; git identity is Trevor Morris / tmorrisrex@gmail.com.
- Deploys via GitHub Action (`.github/workflows/deploy.yml`, uses `withastro/action`) on push to `main`.
- Custom domain: `public/CNAME` contains `ozarkfulfillment.com`; GoDaddy DNS has 4 A records (`@` → 185.199.108–111.153) and `www` CNAME → `ezpickin.github.io`.
- Site is **live** at http://ozarkfulfillment.com. HTTPS certificate provisioning was slow on GitHub's side; once issued, enable "Enforce HTTPS" in Pages settings (or via `gh api ... /pages -X PUT -F https_enforced=true`).
- `gh` CLI is installed at `/c/Program Files/GitHub CLI` (add to PATH in Bash). Authenticated as `ezpickin` with `repo` + `workflow` scopes.

## Possible future enhancements (discussed, not yet done)

- Real warehouse photos (recommended over stock) — a photo section or hero background once the user provides them.
- Privacy-friendly analytics (Cloudflare Web Analytics recommended) — needs the user to create the property and supply the token.

## Commands

- `npm run dev` — local dev server (default http://localhost:4321)
- `npm run build` — static build to `dist/`
- `npm run preview` — serve the built site locally

## Contact facts (safe to show publicly)

1475 S Sam Houston Blvd, Houston, MO 65483 · (417) 453-1005 · trevor@ozarkfulfillment.com

See `LESSONS.md` for the running lessons-learned log.
