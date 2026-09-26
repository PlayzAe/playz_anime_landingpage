# Deploying the PlayzAnime website

The site is fully static: `npm run build` puts everything in `dist/`. Use either host.

## Vercel

1. Push this folder to a GitHub repository.
2. On vercel.com: **Add New → Project**, import it. `vercel.json` sets the build command, output folder and the
   rewrite that makes links like `/docs/watching/the-player` work. Leave the defaults and deploy.
3. Optional: under **Settings → Environment Variables**, set `SITE_URL` to your domain (e.g. `https://playzanime.app`)
   so link previews use a full image address. Redeploy.

## GitHub Pages

1. Push this folder to a GitHub repository.
2. **Settings → Pages → Source: GitHub Actions.**
3. Push to `main`. `.github/workflows/pages.yml` builds and publishes. The site appears at
   `https://<you>.github.io/<repo>/`. `404.html` (written by the build) makes deep links work.
4. With a custom domain: add it under **Settings → Pages**, then add the repository variables
   `BASE_PATH` = `/` and `SITE_URL` = `https://your-domain` (**Settings → Secrets and variables → Actions → Variables**).

## Links to update later

Every Download, Web app and GitHub link comes from one file: `src/lib/links.ts`. When the Windows download,
the web app and the repositories have their real addresses, change them there and redeploy.

## Editing the docs

Docs are Markdown files in `content/docs/<section>/<page>.md`, each starting with:

```
---
title: Page title
description: One sentence for search and previews.
section: Getting started
order: 1
---
```

New files appear in the sidebar, search and prev/next links automatically. Section order is set in
`src/docs/content.ts`.
