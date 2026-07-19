# Ozark Fulfillment Website

The marketing website for [Ozark Fulfillment](https://ozarkfulfillment.com) — a 3PL warehouse in Houston, Missouri offering receiving/shipping (LTL, FTL, containers), storage (incl. climate-controlled), DTC fulfillment, marketplace/FBA & Walmart WFS prep, and value-added services.

Built with [Astro](https://astro.build) and hosted free on **GitHub Pages**. Live at **ozarkfulfillment.com**.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:4321.

## Pages & structure

- **Home** — a single scrolling page (`src/pages/index.astro`) assembled from section components.
- **Privacy Policy** — `src/pages/privacy.astro` (served at `/privacy`).

Each home-page section lives in its own file under `src/components/`:

| Section | File |
|---|---|
| Top navigation | `Header.astro` |
| Hero (headline) | `Hero.astro` |
| Stats strip | `Stats.astro` |
| Services cards | `Services.astro` |
| Why Us | `WhyUs.astro` |
| About | `About.astro` |
| Platform integrations | `Integrations.astro` |
| Quote form | `QuoteForm.astro` |
| Footer / contact | `Footer.astro` |

Most copy lives in plain arrays/text at the top of each file — edit the text and save; the dev server reloads automatically. Colors are defined once in `src/styles/global.css`. Service-card icons are inline SVG in the `services` array in `Services.astro`.

## Quote form

The form posts to [Web3Forms](https://web3forms.com), which emails submissions to trevor@ozarkfulfillment.com. The access key is set in `src/components/QuoteForm.astro` (`WEB3FORMS_ACCESS_KEY`) and is live/working. If the key is ever blank or a placeholder, the form shows a fallback message pointing visitors to the phone/email.

## Deployment

Pushing to `main` on GitHub automatically rebuilds and publishes to GitHub Pages via `.github/workflows/deploy.yml`. Repo: `github.com/ezpickin/ozark-fulfillment-website`.

The custom domain is set by `public/CNAME` (`ozarkfulfillment.com`) plus DNS in GoDaddy:

- Four `A` records on `@` → `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`
- `www` `CNAME` → `ezpickin.github.io`
- **Email (MX/TXT) records are untouched and must stay that way.**

HTTPS is live and **Enforce HTTPS** is on, so `http://` and `www` both redirect to `https://ozarkfulfillment.com`.

Analytics: a Cloudflare Web Analytics beacon (cookieless) is in `src/layouts/Layout.astro`. Stats are private to the owner's Cloudflare dashboard.

## Contact

1475 S Sam Houston Blvd, Houston, MO 65483 · (417) 453-1005 · trevor@ozarkfulfillment.com
Hours: Mon–Fri, 8:00 AM – 4:30 PM CT

See `CLAUDE.md` for project conventions and `LESSONS.md` for the decisions/gotchas log.
