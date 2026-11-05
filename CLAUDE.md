# Ozark Fulfillment Website — Claude Project Guide

Marketing website for Ozark Fulfillment, a 3PL warehouse in Houston, MO. Owner: Trevor Morris (trevor@ozarkfulfillment.com).

## Hard rules (never violate)

- **Never name the WMS publicly.** The company uses JASCI, but all public copy must say "AI-integrated WMS" (or similar) — never the product name.
- **Never name clients on the site** (e.g., MBM, Ezpickin). Social proof is platform integrations only: Amazon Seller Central, Shopify, TikTok Shop, Walmart Marketplace, "+ many others". (Note: the GitHub account is named `ezpickin` — that's a separate client brand; keep it out of site copy.)
- **Never touch MX/TXT DNS records** for ozarkfulfillment.com — company email runs on them. Only the A records (@ → GitHub Pages) and the www CNAME belong to the website.

## Stack & architecture

- **Astro 5** static site. Three pages: the single scrolling home page (`src/pages/index.astro`), a Privacy Policy (`src/pages/privacy.astro`), and a post-submit confirmation page (`src/pages/thanks.astro` — noindexed via Layout's `noindex` prop, excluded from the sitemap, not linked anywhere).
- **Service pages** (for national search): `/amazon-fba-prep/`, `/walmart-wfs-prep/`, `/ecommerce-fulfillment/`, `/climate-controlled-storage/`. Each is a thin page file holding its own copy (included / steps / FAQs arrays) rendered by the shared `src/components/ServicePage.astro` template (hero, Stats, FAQ, related links, Service + BreadcrumbList JSON-LD, and the quote form with the matching service pre-checked). The list of service pages lives in `src/data/servicePages.ts` — add new pages there so the footer, home-page cards and related links pick them up.
- **Header/Footer nav links use `/#section`** (not bare `#section`) so they work from every page; on the home page they still scroll in place without a reload.
- `src/layouts/Layout.astro` — shared `<head>` (meta, OpenGraph, LocalBusiness JSON-LD). Accepts optional `title`/`description` props (home page uses defaults; privacy page overrides them). `canonical` and `og:url` are computed per page from `Astro.url` (e.g. `/privacy/`) — never hardcode them.
- **SEO plumbing:** `@astrojs/sitemap` (pinned 3.6.x — 3.7+ targets zod 4/Astro 6) generates `sitemap-index.xml` + `sitemap-0.xml` at build; `public/robots.txt` points to it. New pages are picked up automatically.
- Home-page section components in `src/components/`, assembled in this order: `Header` → `Hero` → `Stats` → `Services` → `WhyUs` → `About` → `Integrations` → `QuoteForm` → `Footer`. Each is self-contained so a section can later become its own page.
- Shared palette/typography: `src/styles/global.css` (CSS custom properties, derived from the badge logo: navy `#142438/#1b3252`, sky `#a9d2e8`, green `#3a7d3a`, water `#2170b8`, silver `#c6ccd4`). Font is the **system font stack** (Segoe UI / system-ui) — user considered Manrope+Inter but chose to keep the system font for readability.
- The logo (`public/logo.png`) has a white margin around a circular badge — display it inside `.logo-badge` (circular crop + `scale(1.12)`).
- **Service card icons** are inline SVG (Feather-style stroke icons) stored as `svg` strings in the `services` array in `Services.astro`, rendered via `set:html` — NOT emoji (emoji were replaced for a more professional look).
- **Stats strip** (`Stats.astro`): 4 tiles — 65,000 sq ft total · 9,000 sq ft climate-controlled · Same-Day (fulfillment by 12 PM CT) · 250,000+ units/yr. (A previous "99% order accuracy" tile was removed — a precise, below-industry-standard number that invited scrutiny.)
- **About** (`About.astro`): copy sourced from the company's LinkedIn profile.
- **Footer** (`Footer.astro`): address, phone, email, business hours (Mon–Fri 8:00 AM–4:30 PM CT), LinkedIn + Facebook icon links, and a Privacy Policy link.
- **Quote form** (`QuoteForm.astro`): posts to Web3Forms → trevor@ozarkfulfillment.com. Live access key `b1771689-1b3b-457b-9176-e8cd5458f9fb` is set in the `<script>` (`WEB3FORMS_ACCESS_KEY`). Honeypot spam field `botcheck`. Verified working (submissions land in the inbox). Each submission also includes `submitted_from` (the page path, e.g. `/amazon-fba-prep/`) so lead emails show which page converted. `QuoteForm` takes an optional `preselect` prop (a label from its services list). On success the form redirects to `/thanks/`, so **`/thanks/` page views in Cloudflare = successful submissions** — compare against Web3Forms emails to catch delivery failures.

## Hosting & deployment

- **GitHub Pages** (user explicitly chose it over Vercel — no backend needed).
- Repo: **github.com/ezpickin/ozark-fulfillment-website** (public). GitHub account is `ezpickin`; git identity is Trevor Morris / tmorrisrex@gmail.com.
- Deploys via GitHub Action (`.github/workflows/deploy.yml`, uses `withastro/action`) on push to `main`.
- Custom domain: `public/CNAME` contains `ozarkfulfillment.com`; GoDaddy DNS has 4 A records (`@` → 185.199.108–111.153) and `www` CNAME → `ezpickin.github.io`.
- Site is **live at https://ozarkfulfillment.com** with a valid certificate and "Enforce HTTPS" ON (`http://` and `www` both 301-redirect to the secure apex). The cert took ~66 min to provision; enforcement is already enabled.
- `gh` CLI is installed at `/c/Program Files/GitHub CLI` (add to PATH in Bash). Authenticated as `ezpickin` with `repo` + `workflow` scopes.

## Analytics

- **Cloudflare Web Analytics** (cookieless, privacy-friendly) beacon is in `Layout.astro` before `</body>`, so it loads on every page. Data is private to the owner's Cloudflare dashboard. Localhost visits are NOT counted — only the live domain reports.

## Marketing

- **Integration claims (as of Nov 2026):** only **Shopify** is a direct integration. Amazon Seller Central, TikTok Shop and Walmart Marketplace integrations arrive with the WMS switch (planned January 2027) — site copy says "coming soon". **After go-live, update** `Integrations.astro`, `ecommerce-fulfillment.astro` and `marketing/directory-listings.md`. Seller-fulfilled Walmart orders (client sends packing slip + label) are possible but the owner chose **not** to advertise them.
- **Real-time inventory and the "AI-integrated WMS" wording are accurate today** — leave them as is.
- **FBA/WFS prep is full-service:** Ozark can create the Amazon/Walmart shipment or work from one the client creates.
- Small storage-only clients are accepted but not ideal unless high volume — don't market to "a few pallets".

- `marketing/directory-listings.md` — paste-ready listing copy (tagline, short/medium/long descriptions, services, key facts) and the directory checklist (Fulfill.com, Racklify, Clutch, Amazon SPN, …). Keep it in sync with site claims.
- Key insight from the Nov 2026 audit: Google Business Profile traffic is ~81% driver direction requests; local search can't reach national e-commerce brands. Leads must come from 3PL directories, marketplace provider networks, national-intent service pages, and referrals.

## Possible future enhancements (discussed, not yet done)

- Real warehouse photos (recommended over stock) — a photo section or hero background once the user provides them.

## Commands

- `npm run dev` — local dev server (default http://localhost:4321)
- `npm run build` — static build to `dist/`
- `npm run preview` — serve the built site locally

## Contact facts (safe to show publicly)

1475 S Sam Houston Blvd, Houston, MO 65483 · (417) 453-1005 · trevor@ozarkfulfillment.com

See `LESSONS.md` for the running lessons-learned log.
