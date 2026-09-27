import { useEffect, useState } from 'react';
import { summarise } from './content';

/*
 * The changelog is written on GitHub, not here: every published release of the desktop app
 * becomes an entry. The build saves them (scripts/fetch-releases.mjs) so each release gets a
 * prerendered page, and visitors' browsers also ask GitHub for anything newer.
 */

export const RELEASES_REPO = 'PlayzAe/playz_anime_desktopapp';

export interface ReleaseAsset {
  name: string;
  size: number;
  downloads: number;
  url: string;
}

export interface Release {
  tag: string;
  name: string;
  date: string;
  body: string;
  url: string;
  prerelease: boolean;
  assets: ReleaseAsset[];
}

// Missing file (a fresh clone before the first build) simply means no releases yet.
const saved = Object.values(import.meta.glob('../generated/releases.json', { eager: true, import: 'default' }))[0] as Release[] | undefined;

export const BUILT_RELEASES: Release[] = sort(saved ?? []);

function sort(list: Release[]): Release[] {
  return [...list].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

/** URL-safe id for a release: v1.1.0 → v1-1-0. */
export const releaseSlug = (r: Pick<Release, 'tag'>) => r.tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'release';
export const releasePath = (r: Pick<Release, 'tag'>) => `/docs/changelog/${releaseSlug(r)}`;
export const findRelease = (slug: string, list = BUILT_RELEASES) => list.find((r) => releaseSlug(r) === slug);

/** "v1.1.0" when the title is just the tag, otherwise "v1.1.0 · Multi-Source Manga Engine". */
export function releaseTitle(r: Release): string {
  const heading = /^#\s+(.+)$/m.exec(r.body)?.[1]?.replace(/^PlayzAnime\s+/i, '').trim();
  const name = r.name && r.name !== r.tag ? r.name : heading || r.tag;
  return name.toLowerCase().includes(r.tag.toLowerCase()) ? name : `${r.tag} · ${name}`;
}

/** Browser-tab and search-result title of a release's own page. */
export function releasePageTitle(r: Release): string {
  const title = releaseTitle(r);
  const rest = title.toLowerCase().startsWith(r.tag.toLowerCase()) ? title.slice(r.tag.length).replace(/^\s*[·:—–-]?\s*/, '') : title;
  return rest ? `PlayzAnime ${r.tag} release notes: ${rest}` : `PlayzAnime ${r.tag} release notes`;
}

/** The notes without their leading "# Title" line, which becomes the page title instead. */
export const releaseBody = (r: Release) => r.body.replace(/^\s*#\s+.+(\r?\n)+/, '');

export const releaseSummary = (r: Release) => summarise(releaseBody(r)) || `What changed in PlayzAnime ${r.tag}.`;

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export function formatSize(bytes: number): string {
  return bytes > 1048576 ? `${Math.round(bytes / 1048576)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

const CACHE_KEY = 'playzanime-site:releases';
const CACHE_MS = 10 * 60_000;

/**
 * The saved releases, topped up with whatever GitHub has now. Starts with the saved list so
 * the page renders (and hydrates) identically to the prerendered HTML, then updates.
 * `settled` turns true once GitHub has answered (or couldn't be reached).
 */
export function useLiveReleases(): { releases: Release[]; settled: boolean } {
  const [state, setState] = useState({ releases: BUILT_RELEASES, settled: false });
  useEffect(() => {
    let live = true;
    const merge = (fresh: Release[]) => {
      if (!live) return;
      const byTag = new Map(BUILT_RELEASES.map((r) => [r.tag, r]));
      for (const r of fresh) byTag.set(r.tag, r); // GitHub's copy wins: notes may have been edited
      setState({ releases: sort([...byTag.values()]), settled: true });
    };
    try {
      const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? 'null') as { at: number; list: Release[] } | null;
      if (cached && Date.now() - cached.at < CACHE_MS) {
        merge(cached.list);
        return () => void (live = false);
      }
    } catch {
      /* storage unavailable */
    }
    fetch(`https://api.github.com/repos/${RELEASES_REPO}/releases?per_page=30`, { headers: { Accept: 'application/vnd.github+json' } })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((raw: GitHubRelease[]) => {
        const fresh = raw.filter((r) => !r.draft).map(fromGitHub);
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), list: fresh }));
        } catch {
          /* storage unavailable */
        }
        merge(fresh);
      })
      .catch(() => merge([])); // offline or rate-limited: the saved list stands
    return () => void (live = false);
  }, []);
  return state;
}

interface GitHubRelease {
  tag_name: string;
  name: string | null;
  published_at: string | null;
  created_at: string;
  body: string | null;
  html_url: string;
  draft: boolean;
  prerelease: boolean;
  assets: { name: string; size: number; download_count: number; browser_download_url: string }[];
}

function fromGitHub(r: GitHubRelease): Release {
  return {
    tag: r.tag_name,
    name: r.name || r.tag_name,
    date: r.published_at || r.created_at,
    body: r.body || '',
    url: r.html_url,
    prerelease: r.prerelease,
    assets: r.assets.map((a) => ({ name: a.name, size: a.size, downloads: a.download_count, url: a.browser_download_url })),
  };
}
