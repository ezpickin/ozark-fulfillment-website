# Lessons Learned — Ozark Fulfillment Website

A running log of decisions and gotchas, newest first.

## 2026-07-18 — HTTPS resolved & analytics added

- **HTTPS resolved on its own (~66 min).** Holding off on the remove/re-add nudge was the right call — the cert issued automatically. Confusingly, manual `curl` checks from this Windows machine kept returning `WRONG_PRINCIPAL` for 3+ hours *after* the cert was actually live, because requests hit GitHub edge nodes at different propagation stages. Lesson: trust a clean 200 from any node + `https_enforced:true` over intermittent handshake failures, and note the Pages API `status` field can stay `null` even when HTTPS works fine. "Enforce HTTPS" auto-enabled by the watcher; `http://` and `www` now 301 → secure apex.
- **Cloudflare Web Analytics added.** Cookieless beacon in `Layout.astro` (loads on all pages). Owner supplied the token from their Cloudflare dashboard — it's the only piece that can't be generated without their login. Localhost visits don't report; only the live domain counts.

## 2026-07-18 — Launch, deploy & content polish

- **Deployed to GitHub Pages under the `ezpickin` account.** Auth via `gh` CLI device flow. First push was rejected because the OAuth token lacked the `workflow` scope (repo contains `.github/workflows/deploy.yml`) — fixed with `gh auth refresh -s workflow`.
- **DNS pointed from GoDaddy** — deleted the "Parked" A record, added 4 GitHub Pages A records on `@`, and repointed the `www` CNAME to `ezpickin.github.io`. DNS propagated within minutes; site went live over http:// immediately.
- **GitHub Pages HTTPS certificate is slow.** After correct DNS, the Let's Encrypt cert can take well over an hour (GitHub officially says up to 24h). While pending, the domain serves GitHub's default cert (`SEC_E_WRONG_PRINCIPAL` on handshake) and Pages `status` stays `null`. Don't panic-nudge: the remove/re-add-custom-domain trick can *reset* the provisioning clock. A background watcher polls and auto-enables "Enforce HTTPS" once the cert lands.
- **Web3Forms works with no backend.** Free access key emailed to trevor@ozarkfulfillment.com; test submission landed in the inbox (not spam). Key lives in `QuoteForm.astro`.
- **Emoji → SVG icons.** Emoji service-card icons read as casual/inconsistent across devices; replaced with Feather-style inline-SVG stroke icons in the brand green. Big professionalism win for a B2B logistics site.
- **Dropped the "99% accuracy" stat.** A precise metric invites scrutiny and 99% is actually below the 3PL advertising norm (99.5%+). Replaced with broader, defensible tiles (climate-controlled sq ft, Same-Day cutoff). General rule for this site: prefer broad, true strengths over precise numbers you'd have to defend.
- **The "2-day ground reach" idea was rejected as inaccurate.** From Houston, MO, 2-day ground covers the Midwest/eastern half but not the coasts — so we avoided claiming it. Keep shipping-reach language honest ("central-U.S.", "2–3 day") if used at all.
- **About copy pulled from the company LinkedIn** (`linkedin.com/company/ozark-fulfillment`) via WebFetch — includes the 9,000 sq ft climate-controlled detail now used in Stats and Storage.
- **User kept the system font** over a Manrope+Inter proposal (readability preference). Previews were shown via the visualize widget before deciding.
- **Added a Privacy Policy page** (`/privacy`) since the form collects personal data — linked from the footer and under the form. `Layout.astro` was made to accept optional `title`/`description` props to support the second page.

## 2026-07-18 — Initial build

- **OneDrive can trigger Vite full-reloads.** The project lives in a OneDrive-synced folder; sync activity touches files and the dev server hard-reloads the page, wiping in-progress form input. Harmless for visitors (production is static), but during local testing don't be surprised by spontaneous reloads.

- **Logo needs circular cropping.** `Ozark Fulfillment Logo - White.png` is a circular badge on a white square canvas. Displaying it on dark backgrounds requires the `.logo-badge` wrapper (border-radius 50% + `scale(1.12)`) to hide the white corners. A transparent-background PNG/SVG version of the logo would remove this workaround.
- **GitHub Pages chosen over Vercel** because the site is fully static — no backend to justify Vercel. Quote form works without a server via Web3Forms.
- **Domain stays at GoDaddy.** No registrar transfer needed to host elsewhere; just A records → GitHub Pages. Mail (MX/TXT) records must never be modified — company email depends on them.
- **Public copy rules:** WMS referred to only as "AI-integrated WMS" (actual product: JASCI — internal knowledge only); client names never shown.
