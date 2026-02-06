# Bethany Marketing Site - Deployment Guide

## Overview

The Bethany marketing site is built with Eleventy and deployed to Cloudflare Pages.

- **Live URL:** https://network-manager-site.pages.dev
- **Repository:** mrmicaiah/network-manager-site
- **API Endpoint:** https://network-manager.micaiah-tasks.workers.dev

---

## Cloudflare Pages Setup

### 1. Create Pages Project

1. Go to Cloudflare Dashboard → Pages
2. Click "Create a project" → "Connect to Git"
3. Select the `mrmicaiah/network-manager-site` repository
4. Configure build settings:

| Setting | Value |
|---------|-------|
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `_site` |
| Root directory | `/` (leave empty) |

### 2. Environment Variables

No environment variables required for the marketing site. All configuration is in `src/_data/site.json`.

---

## Build Process

The build runs two commands in sequence:

```bash
# Build CSS with Tailwind
npm run build:css
# → Input:  src/styles/main.css
# → Output: _site/styles/main.css

# Build HTML with Eleventy
npm run build:11ty
# → Input:  src/*.njk, src/_includes/*, src/_data/*
# → Output: _site/**/*.html
```

### Local Development

```bash
# Install dependencies
npm install

# Run development server (parallel CSS watch + Eleventy serve)
npm run dev

# Preview production build
npm run build && npx serve _site
```

---

## Project Structure

```
network-manager-site/
├── src/
│   ├── _data/
│   │   └── site.json         # Site configuration (URLs, etc.)
│   ├── _includes/
│   │   ├── base.njk          # Base HTML template
│   │   ├── header.njk        # Navigation header
│   │   └── footer.njk        # Site footer
│   ├── assets/
│   │   └── images/
│   │       └── favicon.svg   # Site favicon
│   ├── styles/
│   │   └── main.css          # Tailwind CSS input file
│   ├── index.njk             # Home page
│   ├── signup.njk            # Signup form
│   ├── terms.njk             # Terms of Service
│   └── privacy.njk           # Privacy Policy
├── eleventy.config.js        # Eleventy configuration
├── package.json              # Dependencies and scripts
└── README.md
```

---

## Configuration

### site.json

```json
{
  "title": "Bethany",
  "tagline": "Your relationship memory",
  "description": "Bethany helps you stay connected...",
  "url": "https://network-manager-site.pages.dev",
  "apiUrl": "https://network-manager.micaiah-tasks.workers.dev"
}
```

**Important:** The `apiUrl` is used by the signup form to POST user data.

---

## Pages

| Page | Path | Description |
|------|------|-------------|
| Home | `/` | Marketing landing page |
| Signup | `/signup` | User registration form |
| Terms | `/terms` | Terms of Service |
| Privacy | `/privacy` | Privacy Policy |

---

## Signup Flow

1. User fills form on `/signup`
2. JavaScript POSTs to `{{ site.apiUrl }}/signup`
3. Worker creates user, sends welcome SMS via SendBlue
4. Success modal displays

### API Integration

The signup form sends:
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "phone": "+15551234567",
  "pin": "1234",
  "termsAccepted": true
}
```

### CORS

The Worker has CORS configured with `Access-Control-Allow-Origin: '*'` so cross-origin requests work.

---

## SSL/HTTPS

Cloudflare Pages automatically provisions SSL certificates for the `*.pages.dev` domain.

---

## Deployment Workflow

### Automatic Deploys

Every push to `main` triggers an automatic build and deployment on Cloudflare Pages.

### Manual Deploy (if needed)

```bash
# Build locally
npm run build

# Deploy via Wrangler
npx wrangler pages deploy _site --project-name=network-manager-site
```

---

## Verification Checklist

After deployment, verify:

- [ ] Home page loads at https://network-manager-site.pages.dev
- [ ] Signup page loads at https://network-manager-site.pages.dev/signup
- [ ] Terms page loads at https://network-manager-site.pages.dev/terms
- [ ] Privacy page loads at https://network-manager-site.pages.dev/privacy
- [ ] Signup form submits successfully
- [ ] User receives welcome SMS after signup
- [ ] HTTPS works (green padlock)
- [ ] All internal links work
- [ ] Favicon displays
- [ ] Fonts load (Fraunces, Plus Jakarta Sans)
- [ ] CSS loads (styled page, not unstyled HTML)

---

## Troubleshooting

### Build Fails

1. Check Cloudflare Pages build logs
2. Common issues:
   - Node version mismatch (Pages uses Node 18 by default)
   - Missing dependencies (run `npm install` locally to verify)
   - Tailwind CSS issues (check `main.css` for syntax errors)

### Signup Form Not Working

1. Check browser console for errors
2. Verify `apiUrl` in site.json is correct
3. Test API directly: `curl -X POST https://network-manager.micaiah-tasks.workers.dev/signup -H "Content-Type: application/json" -d '{"name":"Test"}'`
4. Check Worker logs in Cloudflare Dashboard

### CORS Errors

The Worker should already handle CORS. If issues:
1. Verify preflight OPTIONS request returns correct headers
2. Check `shared/http.ts` for CORS configuration

---

*Last updated: February 2026*
