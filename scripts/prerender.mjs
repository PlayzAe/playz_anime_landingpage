// After the client and server builds: writes every page as real HTML (dist/<route>/index.html)
// with its own title, description, canonical link and structured data, so search engines and
// link previews see the content without running JavaScript. Also writes sitemap.xml,
// robots.txt, 404.html (GitHub Pages and Vercel serve it for unknown paths; the app then
// renders the right page) and .nojekyll.
//
// Settings (environment): BASE_PATH and SITE_URL as for vite.config.ts. Optional:
// GOOGLE_SITE_VERIFICATION / BING_SITE_VERIFICATION add the verification meta tags.
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const ssrDir = resolve(root, '.ssr');

function normaliseBase(raw) {
  if (!raw || raw.trim() === '' || raw.trim() === '/') return '/';
  let base = raw.trim().replace(/\\/g, '/');
  if (!base.startsWith('/')) base = `/${base}`;
  if (!base.endsWith('/')) base = `${base}/`;
  return base;
}
const base = normaliseBase(process.env.BASE_PATH);
const site = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://playzae.github.io')
).replace(/\/+$/, '');

/** Absolute URL for an app path; pages end in a slash because they're folders. */
const abs = (path) => {
  const p = path.replace(/^\/+/, '');
  const slashed = p === '' || p.endsWith('/') || /\.[a-z0-9]{2,5}$/i.test(p) ? p : `${p}/`;
  return `${site}${base}${slashed}`;
};

const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c');

const entry = resolve(ssrDir, 'entry-server.js');
if (!existsSync(entry)) throw new Error('Run `vite build --ssr src/entry-server.tsx --outDir .ssr` first');
const { render, routes, headFor, sitemapEntries } = await import(pathToFileURL(entry).href);

const template = readFileSync(resolve(dist, 'index.html'), 'utf8');

function setMeta(html, key, value, by = 'property') {
  const re = new RegExp(`<meta ${by}="${key}" content="[^"]*"\\s*/?>`);
  const tag = `<meta ${by}="${key}" content="${attr(value)}" />`;
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
}

const verification = [
  process.env.GOOGLE_SITE_VERIFICATION && `<meta name="google-site-verification" content="${attr(process.env.GOOGLE_SITE_VERIFICATION)}" />`,
  process.env.BING_SITE_VERIFICATION && `<meta name="msvalidate.01" content="${attr(process.env.BING_SITE_VERIFICATION)}" />`,
].filter(Boolean);

// Motion elements start invisible until their animation runs; without JavaScript, show them.
const NOSCRIPT_STYLE = '<noscript><style>#root [style*="opacity:0"]{opacity:1!important;transform:none!important}</style></noscript>';

// 404.html: the empty shell, so any address the build didn't know about still gets the app.
{
  let html = template.replace('</head>', '    <meta name="robots" content="noindex" />\n  </head>');
  writeFileSync(resolve(dist, '404.html'), html);
}

let count = 0;
for (const path of routes()) {
  const head = headFor(path, abs);
  const body = render(path);
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${attr(head.title)}</title>`)
    .replace(/<noscript>[\s\S]*?<\/noscript>/, '')
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  html = setMeta(html, 'description', head.description, 'name');
  html = setMeta(html, 'og:type', head.type);
  html = setMeta(html, 'og:title', head.title);
  html = setMeta(html, 'og:description', head.description);
  html = setMeta(html, 'og:url', abs(head.canonical));
  html = setMeta(html, 'twitter:title', head.title, 'name');
  html = setMeta(html, 'twitter:description', head.description, 'name');
  const extra = [
    `<link rel="canonical" href="${attr(abs(head.canonical))}" />`,
    `<link rel="sitemap" type="application/xml" href="${attr(abs('/sitemap.xml'))}" />`,
    ...(path === '/' ? verification : []),
    ...head.jsonLd.map((o) => `<script type="application/ld+json">${json(o)}</script>`),
    NOSCRIPT_STYLE,
  ];
  html = html.replace('</head>', `    ${extra.join('\n    ')}\n  </head>`);

  const file = path === '/' ? resolve(dist, 'index.html') : resolve(dist, `.${path}`, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  count++;
}

const today = new Date().toISOString().slice(0, 10);
const urls = sitemapEntries()
  .map(({ path, lastmod }) => `  <url><loc>${attr(abs(path))}</loc><lastmod>${(lastmod || today).slice(0, 10)}</lastmod></url>`)
  .join('\n');
writeFileSync(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
writeFileSync(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`);
writeFileSync(resolve(dist, '.nojekyll'), '');
rmSync(ssrDir, { recursive: true, force: true });

console.log(`[prerender] ${count} pages, sitemap.xml, robots.txt and 404.html written for ${abs('/')}`);
