# Bethany Landing Page

Landing page for Bethany — your relationship memory assistant. Built with Eleventy and Tailwind CSS v4.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- **Static Site Generator:** [Eleventy (11ty)](https://www.11ty.dev/) v3
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4
- **Templating:** Nunjucks
- **Hosting:** Cloudflare Pages

## Project Structure

```
├── src/
│   ├── _includes/          # Layout templates and partials
│   │   ├── base.njk        # Base HTML layout
│   │   ├── header.njk      # Site header
│   │   └── footer.njk      # Site footer
│   ├── _data/              # Global data files
│   │   └── site.json       # Site metadata
│   ├── assets/             # Static assets (copied to output)
│   │   └── images/
│   ├── styles/
│   │   └── main.css        # Tailwind CSS entry point
│   ├── index.njk           # Homepage
│   ├── signup.njk          # Signup page
│   ├── privacy.njk         # Privacy policy
│   └── terms.njk           # Terms of service
├── eleventy.config.js      # Eleventy configuration
├── package.json
└── README.md
```

## Deployment

### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `_site`
   - **Node.js version:** 18+

The site automatically deploys when you push to `main`.

### Manual Deployment

```bash
npm run build
# Upload _site/ directory to your hosting provider
```

## Configuration

### API Endpoint

The signup form posts to the Network Manager API. Update the URL in `src/_data/site.json`:

```json
{
  "apiUrl": "https://network-manager.micaiah-tasks.workers.dev"
}
```

### Customization

- **Colors:** Edit CSS variables in `src/styles/main.css` under `@theme`
- **Fonts:** Currently using Fraunces (display) and Plus Jakarta Sans (body)
- **Content:** Edit `.njk` files in `src/`

## Development

### Adding a new page

1. Create a new `.njk` file in `src/`
2. Add front matter with layout and metadata:

```yaml
---
layout: base.njk
title: Page Title
description: Page description for SEO
---
```

3. Write your content below the front matter

### Styling

This project uses Tailwind CSS v4 with the new CSS-based configuration. Custom utilities and components are defined in `src/styles/main.css`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run build:11ty` | Build Eleventy only |
| `npm run build:css` | Build Tailwind CSS only |

## License

Proprietary — Untitled Publishers