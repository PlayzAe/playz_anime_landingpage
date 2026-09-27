import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

/**
 * Hosting settings, read from the environment at build time:
 *   BASE_PATH  where the site lives, e.g. "/playzanime-site/" for a GitHub Pages
 *              project site. Defaults to "/".
 *   SITE_URL   the public origin, e.g. "https://playzae.github.io". Only used to
 *              make the social preview image URL absolute.
 */
function normaliseBase(raw: string | undefined): string {
  if (!raw || raw.trim() === '' || raw.trim() === '/') return '/';
  let base = raw.trim().replace(/\\/g, '/');
  if (!base.startsWith('/')) base = `/${base}`;
  if (!base.endsWith('/')) base = `${base}/`;
  return base;
}

const base = normaliseBase(process.env.BASE_PATH);
const siteUrl = (
  process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
).replace(/\/+$/, '');

function socialMeta(): Plugin {
  return {
    name: 'playzanime-social-meta',
    transformIndexHtml(html) {
      return html.replaceAll('%OG_IMAGE%', `${siteUrl}${base}og.png`).replaceAll('%SITE_BASE%', `${siteUrl}${base}`);
    },
  };
}

export default defineConfig(({ isSsrBuild }) => ({
  base,
  plugins: [react(), socialMeta()],
  build: {
    target: 'es2022',
    assetsInlineLimit: 0,
    // The server build only renders pages at build time; it needs no copy of /public.
    copyPublicDir: !isSsrBuild,
    chunkSizeWarningLimit: 700,
  },
  server: {
    port: 5320,
    strictPort: false,
  },
  preview: {
    port: 5321,
  },
}));
