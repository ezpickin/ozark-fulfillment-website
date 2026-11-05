import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ozarkfulfillment.com',
  // Generates /sitemap-index.xml + /sitemap-0.xml at build time (referenced from public/robots.txt).
  // /thanks/ is the post-submit confirmation page — keep it out of search results.
  integrations: [sitemap({ filter: (page) => !page.includes('/thanks') })],
});
