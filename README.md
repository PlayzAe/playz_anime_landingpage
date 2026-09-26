# PlayzAnime website

The home of PlayzAnime: a landing page for the Windows app and the web app, plus the docs and policies.
Vite, React and Motion. It builds to a fully static folder.

```bash
start.bat            # live reload on http://localhost:5320
start.bat built      # the production build on http://localhost:5321
npm run build        # typecheck, build to dist/, write 404.html for GitHub Pages
npm run shots        # screenshots of the built site (desktop and phone) into shots/
npm run images       # remake the WebP copies after changing public/screenshots/*.png
```

- **Deploying:** see [DEPLOY.md](DEPLOY.md) (Vercel or GitHub Pages).
- **Links:** every Download, Web app and GitHub link comes from `src/lib/links.ts`.
- **Docs:** Markdown in `content/docs/`. The policies (Terms of Service, Copyright & DMCA, Disclaimer, Privacy)
  are in `content/docs/policies/`.

```
src/
  landing/     the landing page
  docs/        docs loading, rendering, search, layout
  components/  header, footer, logo, icons, accent switcher, screenshot frames
  lib/         router (base-path aware), accents, links
  styles/      design tokens shared with the app, base and site styles
content/docs/  the docs, one Markdown file per page
public/        logo, screenshots (PNG + WebP), social preview image
```
