// Single list of the dedicated service pages — used by the footer, the home-page
// service cards, and each page's "related services" links. Add a page here when
// you create a new src/pages/<slug>.astro service page.
export const servicePages = [
  { slug: 'amazon-fba-prep', name: 'Amazon FBA Prep' },
  { slug: 'walmart-wfs-prep', name: 'Walmart WFS Prep' },
  { slug: 'ecommerce-fulfillment', name: 'Shopify & TikTok Shop Fulfillment' },
  { slug: 'climate-controlled-storage', name: 'Climate-Controlled Storage' },
] as const;

export type ServiceSlug = (typeof servicePages)[number]['slug'];
