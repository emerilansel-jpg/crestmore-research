# Crestmore Research

Professional authority research site built with Astro, Decap CMS, and deployed to Cloudflare Pages.

**Live site:** [crestmoreresearch.com](https://crestmoreresearch.com)  
**Stack:** Astro (static) · Decap CMS · Cloudflare Pages · GitHub

---

## Quick Start (Local Development)

### Prerequisites
- Node.js 20 or higher
- npm

### Install and run

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/crestmore-research.git
cd crestmore-research

# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev
```

### Build for production

```bash
npm run build
# Output is in the /dist directory
```

---

## Project Structure

```
crestmore-research/
├── public/
│   ├── admin/
│   │   ├── index.html          # Decap CMS entry point
│   │   └── config.yml          # CMS configuration
│   ├── images/                 # Uploaded media (gitignored)
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro        # Sticky dark navy header
│   │   ├── Footer.astro        # Dark footer, 3-column layout
│   │   ├── ArticleCard.astro   # Card for article grids
│   │   └── AuthorBox.astro     # Author attribution block
│   ├── layouts/
│   │   ├── BaseLayout.astro    # HTML shell + schema.org
│   │   └── ArticleLayout.astro # Article page layout
│   ├── pages/
│   │   ├── index.astro         # Homepage (hero + grid)
│   │   ├── research.astro      # All articles index
│   │   ├── about.astro         # About page
│   │   └── research/
│   │       └── [...slug].astro # Dynamic article pages
│   ├── content/
│   │   ├── config.ts           # Content collection schema
│   │   └── research/           # Markdown article files
│   └── styles/
│       └── global.css          # All CSS (variables, components, responsive)
├── astro.config.mjs
└── package.json
```

---

## Publishing Articles via Decap CMS

The CMS runs in your browser and edits files directly in your GitHub repository.

### First-time setup

1. **Enable GitHub OAuth** — Decap CMS requires a GitHub OAuth app for authentication.
   - Go to GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
   - Application name: `Crestmore Research CMS`
   - Homepage URL: `https://crestmoreresearch.com`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
   - Note the Client ID and Client Secret

2. **Update `public/admin/config.yml`** — Replace `GITHUB_USERNAME` with your actual GitHub username.

3. **Access the admin** — Go to `https://crestmoreresearch.com/admin/` and authenticate with GitHub.

### Writing a new article

1. Go to `https://crestmoreresearch.com/admin/`
2. Click **New Research Article**
3. Fill in: Title, Date, Author, Category, Tags, Description, Featured Image, Body
4. Click **Publish** — this commits the markdown file directly to your GitHub repository
5. Cloudflare Pages detects the commit and rebuilds the site automatically (typically 2–3 minutes)

### Article frontmatter reference

```yaml
---
title: "Article Title Here"
date: 2026-04-27
author: "James Whitfield, Senior Research Analyst"
category: "Cybersecurity"
tags: ["tag1", "tag2"]
description: "150-160 character meta description for SEO."
featured_image: "/images/your-image.jpg"  # optional
---
```

---

## Deploying to Cloudflare Pages

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/crestmore-research.git
git push -u origin main
```

### Step 2 — Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create application** → **Pages**
2. Connect your GitHub account and select the `crestmore-research` repository
3. Configure build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** 20 (set in Environment Variables: `NODE_VERSION = 20`)
4. Click **Save and Deploy**

Cloudflare Pages assigns a `.pages.dev` subdomain immediately. Every push to `main` triggers an automatic rebuild.

---

## Domain Setup (crestmoreresearch.com)

### Step 1 — Purchase the domain

Purchase `crestmoreresearch.com` at [spaceship.com](https://spaceship.com).

### Step 2 — Add site to Cloudflare

1. In the Cloudflare Dashboard, click **Add a Site**
2. Enter `crestmoreresearch.com` → Select the **Free** plan
3. Cloudflare will scan for existing DNS records
4. Copy the **two nameserver addresses** Cloudflare provides (e.g., `aria.ns.cloudflare.com`)

### Step 3 — Update nameservers at Spaceship

1. Log in to Spaceship → My Domains → `crestmoreresearch.com` → Manage
2. Go to **Nameservers** → Select **Custom Nameservers**
3. Enter the two Cloudflare nameservers
4. Save — propagation takes up to 48 hours (usually under 2 hours)

### Step 4 — Connect domain to Cloudflare Pages

1. In Cloudflare Dashboard → Workers & Pages → your Pages project
2. Go to **Custom Domains** → **Set up a custom domain**
3. Enter `crestmoreresearch.com`
4. Cloudflare will automatically configure DNS and issue an SSL certificate

---

## Adding Featured Images

1. Recommended dimensions: **1200 × 675px** (16:9 ratio)
2. Save images to `public/images/` — they are served from `/images/`
3. Reference in frontmatter: `featured_image: "/images/your-image.jpg"`
4. When publishing via Decap CMS, upload images directly through the CMS interface

---

## Design Tokens

Edit CSS custom properties in `src/styles/global.css` to retheme the site:

```css
:root {
  --bg: #ffffff;
  --navy-dark: #0a1628;    /* Header, hero, footer background */
  --navy-mid: #1a2f4a;     /* Borders, secondary elements */
  --accent: #1d6fa4;       /* Category badges, links, highlights */
  --text-body: #2d3748;    /* Primary body text */
  --text-muted: #718096;   /* Secondary text, dates, excerpts */
  --border: #e2e8f0;       /* Card borders, dividers */
}
```

---

## Tech Stack Details

| Layer | Technology | Purpose |
|---|---|---|
| Framework | [Astro](https://astro.build) | Static site generation |
| CMS | [Decap CMS](https://decapcms.org) | Browser-based content editing |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com) | Free static hosting + CDN |
| Fonts | [Google Fonts](https://fonts.google.com) | Playfair Display + Inter |
| Schema | schema.org JSON-LD | SEO structured data |

---

## SEO Features

- **Organization schema** on every page
- **Article schema** on individual research pages (headline, author, datePublished, image)
- **BreadcrumbList schema** on article pages
- **Open Graph** and **Twitter Card** meta tags on all pages
- **Canonical URLs** on all pages
- **Reading time** displayed on article pages
- **Semantic HTML** throughout (landmark elements, aria labels, proper heading hierarchy)

---

© 2026 Crestmore Research. All rights reserved.
