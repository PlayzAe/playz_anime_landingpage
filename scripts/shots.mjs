// Screenshots of the built site for review: `npm run build`, start `npx vite preview --port 5321`,
// then `npm run shots`. Uses the Edge (or Chrome) already installed on Windows; nothing is downloaded.
import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
// playwright-core lives in the desktop app's project next door; install it here to use your own.
const require = createRequire(resolve(root, '..', 'Electron Conversion', 'package.json'));
const { chromium } = require('playwright-core');

const BASE = process.env.SHOTS_URL || 'http://localhost:5321';
const out = resolve(root, 'shots');
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ channel: 'msedge' }).catch(() => chromium.launch({ channel: 'chrome' }));
const views = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'phone', width: 390, height: 844 },
];
const pages = [
  { name: 'landing', path: '/', scrolls: [0, 1100, 2400] },
  { name: 'docs', path: '/docs/policies/terms-of-service', scrolls: [0] },
];

for (const v of views) {
  const page = await browser.newPage({ viewport: { width: v.width, height: v.height }, deviceScaleFactor: 1 });
  for (const p of pages) {
    await page.goto(`${BASE}${p.path}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2200); // entrance animations
    for (const y of p.scrolls) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(1000);
      const file = resolve(out, `${p.name}-${v.name}${y ? `-${y}` : ''}.png`);
      await page.screenshot({ path: file });
      console.log('saved', file);
    }
  }
  await page.close();
}
await browser.close();
