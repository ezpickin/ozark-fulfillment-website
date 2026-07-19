# Lessons Learned — Ozark Fulfillment Website

A running log of decisions and gotchas, newest first.

## 2026-07-18 — Initial build

- **Logo needs circular cropping.** `Ozark Fulfillment Logo - White.png` is a circular badge on a white square canvas. Displaying it on dark backgrounds requires the `.logo-badge` wrapper (border-radius 50% + `scale(1.12)`) to hide the white corners. A transparent-background PNG/SVG version of the logo would remove this workaround.
- **GitHub Pages chosen over Vercel** because the site is fully static — no backend to justify Vercel. Quote form works without a server via Web3Forms.
- **Domain stays at GoDaddy.** No registrar transfer needed to host elsewhere; just A records → GitHub Pages. Mail (MX/TXT) records must never be modified — company email depends on them.
- **Public copy rules:** WMS referred to only as "AI-integrated WMS" (actual product: JASCI — internal knowledge only); client names never shown.
