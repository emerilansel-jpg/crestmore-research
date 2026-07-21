import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://crestmoreresearch.com',
  redirects: {
    // Sector cards on the homepage link to /sectors/:slug (not implemented).
    '/sectors/copper-base': '/research',
    '/sectors/precious': '/research',
    '/sectors/energy-transition': '/research',
    '/sectors/agri': '/research',
    '/sectors/capital-flows': '/research',
    '/sectors/country-risk': '/research',
    '/sectors/macro-rates': '/research',
    '/sectors/freight': '/research',
    // Insight items on the homepage link to /insights/:slug (not implemented).
    '/insights/copper-structural-deficit': '/research',
    '/insights/india-infrastructure': '/research',
    '/insights/dollar-dynamics': '/research',
    '/insights/drc-mining-regulatory': '/research',
    '/insights/critical-minerals-scenarios': '/research',
    '/insights/baltic-dry-shipping': '/research',
    // Featured reports on the homepage link to /research/:slug pages that do not exist.
    '/research/copper-outlook-q2-2026': '/research',
    '/research/africa-mining-q1-2026': '/research',
    '/research/critical-minerals-2030': '/research',
    '/research/drc-regulatory-reset': '/research',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin/'),
    }),
  ],
});
