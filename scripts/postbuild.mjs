// After `vite build`: GitHub Pages has no rewrites, so a deep link like /docs/watching/the-player
// would 404. Pages serves 404.html for unknown paths, so it gets a copy of the site, which reads
// the address and shows the right page. .nojekyll stops Pages from skipping files. (Vercel uses
// the rewrite in vercel.json instead and ignores both.)
import { copyFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const dist = resolve(import.meta.dirname, '..', 'dist');
copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'));
writeFileSync(resolve(dist, '.nojekyll'), '');
console.log('[postbuild] dist/404.html and .nojekyll written');
