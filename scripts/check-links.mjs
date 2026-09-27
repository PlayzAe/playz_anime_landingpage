// Lists every link in the docs and the site that points at a docs page that doesn't exist.
//   node scripts/check-links.mjs
// Exits with an error when it finds any, so it can guard a build.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const walk = (dir) => readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? walk(join(dir, f)) : [join(dir, f)]));
const rel = (f) => relative(root, f).split('\\').join('/');

const docs = walk(join(root, 'content', 'docs')).filter((f) => f.endsWith('.md'));
const pages = new Set(docs.map((f) => `/${rel(f).replace(/^content\//, '').replace(/\.md$/, '')}`));
// Routes that aren't Markdown files: the docs home, the changelog, the policies index and the short aliases.
for (const p of ['/', '/docs', '/docs/changelog', '/docs/policies', '/docs/policies/dmca', '/docs/dmca', '/dmca', '/docs/policies/copyright', '/docs/copyright']) pages.add(p);

const files = [...docs, ...walk(join(root, 'src')).filter((f) => /\.(tsx?|md)$/.test(f))];
const dead = new Map();
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  for (const m of text.matchAll(/(?:\]\(|to=["'{`]|to: ['"`]|path: ['"`])(\/(?:docs|dmca)[^)"'`#\s]*)/g)) {
    const target = m[1].replace(/\/+$/, '');
    if (target.startsWith('/docs/changelog/')) continue; // release pages come from GitHub
    if (target.includes('${') || target.includes('...')) continue; // code building a path, not a link
    if (!pages.has(target)) dead.set(target, [...(dead.get(target) ?? []), rel(file)]);
  }
}
for (const [target, from] of dead) console.log(`${target}  <-  ${[...new Set(from)].join(', ')}`);
console.log(dead.size ? `\n${dead.size} dead link(s)` : `No dead links (${pages.size} pages).`);
process.exitCode = dead.size ? 1 : 0;
