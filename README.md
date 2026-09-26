<p align="center">
<a href="https://playzae.github.io/playz_anime_landingpage/">
<img src="https://raw.githubusercontent.com/PlayzAe/playz_anime_landingpage/main/public/icon.png" alt="PlayzAnime Logo" width="75px"/>
</a>
</p>

<h1 align="center"><b>PlayzAnime — Landing Page & Docs</b></h1>

<p align="center">
<img src="https://raw.githubusercontent.com/PlayzAe/playz_anime_landingpage/main/public/og.png" alt="PlayzAnime Landing Preview" width="100%"/>
</p>

<p align="center">
  <a href="https://playzae.github.io/playz_anime_landingpage/">Website</a> |
  <a href="https://playz-anime.onrender.com">Launch Web App</a> |
  <a href="https://playzae.github.io/playz_anime_landingpage/docs">Documentation</a> |
  <a href="https://playzae.github.io/playz_anime_landingpage/docs/policies/dmca">Copyright</a>
</p>

<div align="center">
  <a href="https://github.com/PlayzAe/playz_anime_landingpage">
    <img src="https://img.shields.io/github/stars/PlayzAe/playz_anime_landingpage?style=flat-square&color=crimson" alt="GitHub Stars" />
  </a>
  <a href="https://playzae.github.io/playz_anime_landingpage/">
    <img src="https://img.shields.io/badge/Landing%20Page-Online-brightgreen?style=flat-square" alt="Status" />
  </a>
  <a href="https://github.com/PlayzAe/playz_anime_landingpage/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-Proprietary-red?style=flat-square" alt="License" />
  </a>
</div>

<h5 align="center">
Leave a star if you like the project! ⭐️
</h5>

<br>

## About

This repository powers the official **landing page, product showcase, knowledge base, and legal policies** for **PlayzAnime**: the high-performance media client and web streaming app.

Built with **React 19**, **Motion**, and **Vite**, it compiles to a blazing-fast 100% static site deployed globally via **GitHub Pages**.

---

## Features

- **Interactive Showcases:** High-fidelity animated product previews highlighting the native desktop app and streaming web app.
- **Direct Web App Launch:** One-click gateway linking to the live [PlayzAnime Web App](https://playz-anime.onrender.com).
- **Comprehensive Documentation:** Full Markdown documentation engine with real-time client-side search.
- **Legal Compliance Suite:** Built-in DMCA, Copyright, Privacy, and Terms of Service documents.
- **Dynamic Theme Palette:** Interactive color accent switcher mirroring the native desktop application.

---

## Get started

Visit the live landing page:

<p align="center">
<a href="https://playzae.github.io/playz_anime_landingpage/" style="font-size:18px;">
<b>Explore PlayzAnime Website →</b>
</a>
</p>

<br>

## Tech stack

* **Framework:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
* **Bundler:** [Vite](https://vite.dev/)
* **Animations:** [Motion](https://motion.dev/)
* **Typography:** Archivo Variable Font
* **Deployment:** [GitHub Pages](https://pages.github.com/)

---

## Development and Build

### 1. Install dependencies
```bash
npm install
```

### 2. Local development
```bash
# Start live reload server on http://localhost:5320
npm run dev
# or on Windows
start.bat
```

### 3. Production build
```bash
# Build static site to dist/
npm run build

# Preview production build on http://localhost:5321
npm run preview
# or on Windows
start.bat built
```

### 4. Screenshot pipeline
```bash
npm run shots    # captures new screenshots of the built site
npm run images   # optimizes and remakes WebP copies in public/screenshots/
```

---

## Links Configuration

All product links (Web App, Downloads, GitHub) are centralized in:
👉 [`src/lib/links.ts`](src/lib/links.ts)

```ts
export const GITHUB_URL = 'https://github.com/PlayzAe';
export const DOWNLOAD_URL = GITHUB_URL;
export const WEB_APP_URL = 'https://playz-anime.onrender.com';
```

<br>

> [!NOTE]
> For copyright requests and DMCA notices, refer to [playzae.github.io/playz_anime_landingpage/docs/policies/dmca](https://playzae.github.io/playz_anime_landingpage/docs/policies/dmca).
