// Saves the desktop app's GitHub Releases as src/generated/releases.json, so every release
// gets a prerendered, indexable page. Write release notes on GitHub; the site picks them up
// at the next build (the Pages workflow also rebuilds on a schedule), and the changelog page
// checks GitHub live as well, so a new release shows up for visitors right away.
//
// Public data only: no token needed. In GitHub Actions the workflow's own GITHUB_TOKEN is
// passed in automatically, which just raises the rate limit.
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const REPO = process.env.RELEASES_REPO || 'PlayzAe/playz_anime_desktopapp';
const out = resolve(import.meta.dirname, '..', 'src', 'generated', 'releases.json');

const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'playzanime-site' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

try {
  const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=50`, { headers, signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const releases = (await res.json())
    .filter((r) => !r.draft)
    .map((r) => ({
      tag: r.tag_name,
      name: r.name || r.tag_name,
      date: r.published_at || r.created_at,
      body: r.body || '',
      url: r.html_url,
      prerelease: r.prerelease,
      assets: (r.assets || []).map((a) => ({ name: a.name, size: a.size, downloads: a.download_count, url: a.browser_download_url })),
    }));
  mkdirSync(resolve(out, '..'), { recursive: true });
  writeFileSync(out, JSON.stringify(releases, null, 1));
  console.log(`[releases] saved ${releases.length} release(s) from ${REPO}`);
} catch (err) {
  // Offline or rate-limited: keep whatever was saved last time, or an empty list.
  if (!existsSync(out)) {
    mkdirSync(resolve(out, '..'), { recursive: true });
    writeFileSync(out, '[]');
  }
  console.warn(`[releases] could not reach GitHub (${err.message}); using the last saved list`);
}
