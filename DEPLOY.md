# Deploying the PlayzAnime website

The site is fully static: `npm run build` puts everything in `dist/`, with every page prerendered as real HTML
(`dist/docs/changelog/index.html` and so on) plus `sitemap.xml` and `robots.txt`. Use either host.

## Vercel

1. Push this folder to a GitHub repository.
2. On vercel.com: **Add New → Project**, import it. `vercel.json` sets the build command and output folder. Leave the
   defaults and deploy. Vercel's own domain is picked up automatically for canonical links and the sitemap.
3. Optional: under **Settings → Environment Variables**, set `SITE_URL` to your domain (e.g. `https://playzanime.app`)
   when you add a custom domain. Redeploy.
4. For the daily changelog rebuild on Vercel, add a Deploy Hook (**Settings → Git → Deploy Hooks**) and call it
   from a cron service, or just redeploy after publishing a release.

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

## The changelog (no code needed)

The changelog at `/docs/changelog` is built from the GitHub Releases of `PlayzAe/playz_anime_desktopapp`.

1. On GitHub: **Releases → Draft a new release**, pick a tag (e.g. `v1.2.0`), write the notes in Markdown,
   attach the installer and portable `.exe`, and publish.
2. That's it. Visitors see it on the changelog straight away (their browser asks GitHub). The first line
   `# Title` becomes the release title; `## Headings` inside show up in the page's outline.
3. Each release also gets its own page, `/docs/changelog/v1-2-0`, for search engines. The Pages workflow
   rebuilds every day at 06:17 UTC to add it; run **Actions → Deploy to GitHub Pages → Run workflow** to do it now.

Drafts never appear. Pre-releases appear with a "Pre-release" badge. `npm run releases` fetches them locally.

## Search engines

Every build writes, for each page: a title and description, a canonical link, Open Graph tags and JSON-LD
(the app as a `SoftwareApplication`, the FAQ, breadcrumbs, and each release as an article), plus
`sitemap.xml` and `robots.txt`.

- Put the site's address in the **Website** field of each GitHub repository (the gear next to About). Links from
  GitHub are how search engines find a new site when it isn't submitted anywhere.
- If you later use Google Search Console or Bing Webmaster Tools, choose the "HTML tag" verification and set the
  repository variable `GOOGLE_SITE_VERIFICATION` or `BING_SITE_VERIFICATION` to the code; the build adds the tag.
  Then submit `sitemap.xml`.
