# Ozark Fulfillment Website

The marketing website for [Ozark Fulfillment](https://ozarkfulfillment.com) — a 3PL warehouse in Houston, Missouri offering receiving, storage, DTC fulfillment, marketplace/FBA prep, and value-added services.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:4321.

## Editing content

The site is a single scrolling page. Each section lives in its own file under `src/components/`:

| Section | File |
|---|---|
| Top navigation | `src/components/Header.astro` |
| Hero (headline) | `src/components/Hero.astro` |
| Services cards | `src/components/Services.astro` |
| Why Us | `src/components/WhyUs.astro` |
| Platform integrations | `src/components/Integrations.astro` |
| Quote form | `src/components/QuoteForm.astro` |
| Footer / contact | `src/components/Footer.astro` |

Most copy is in plain arrays/text at the top of each file — edit the text and save; the dev server reloads automatically.

Colors and fonts are defined once in `src/styles/global.css`.

## Quote form

The form posts to [Web3Forms](https://web3forms.com), which emails submissions to trevor@ozarkfulfillment.com. The access key is set in `src/components/QuoteForm.astro` (`WEB3FORMS_ACCESS_KEY`). Until a real key is set, the form shows a fallback message with the phone/email.

## Deployment

Pushing to the `main` branch on GitHub automatically rebuilds and publishes the site to GitHub Pages (see `.github/workflows/deploy.yml`). The custom domain is configured via `public/CNAME` plus A records in GoDaddy DNS.
