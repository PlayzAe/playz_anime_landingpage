import { BUILT_RELEASES, formatDate, releasePageTitle, releasePath, releaseSummary, releaseTitle, RELEASES_REPO } from './docs/changelog';
import { DOC_ALIASES, findPage, PAGES } from './docs/content';
import { FAQ, faqPlain } from './landing/faq';
import { DOWNLOAD_URL, WEB_APP_URL } from './lib/links';

/*
 * What search engines read for each page: its title and description, where the one true
 * copy lives (canonical), and structured data (JSON-LD) so results can show the app, the
 * FAQ, breadcrumbs and article dates. The build writes it into every prerendered page.
 */

export interface Head {
  title: string;
  description: string;
  /** App path of the page this one is a copy of, when it's an alias such as /dmca. */
  canonical: string;
  type: 'website' | 'article';
  jsonLd: Record<string, unknown>[];
}

export const CHANGELOG_TITLE = 'PlayzAnime changelog: release notes for every version';
const REPO_URL = `https://github.com/${RELEASES_REPO}`;
export const HOME_TITLE = 'PlayzAnime: free anime & manga app for Windows, open source';
const HOME_DESCRIPTION =
  'PlayzAnime is a free, ad-free, open-source desktop app to watch and download anime and read and download manga, manhwa and manhua. For Windows 10 and 11, with a web version.';

/** Every page the build writes, aliases last. */
export function routes(): string[] {
  return ['/', '/docs', '/docs/changelog', ...BUILT_RELEASES.map(releasePath), '/docs/policies', ...PAGES.map((p) => p.path), ...Object.keys(DOC_ALIASES)];
}

/** Pages listed in the sitemap, with the date they last changed when we know it. */
export function sitemapEntries(): { path: string; lastmod?: string }[] {
  const latest = BUILT_RELEASES[0]?.date;
  return [
    { path: '/', lastmod: latest },
    { path: '/docs' },
    { path: '/docs/changelog', lastmod: latest },
    ...BUILT_RELEASES.map((r) => ({ path: releasePath(r), lastmod: r.date })),
    { path: '/docs/policies' },
    ...PAGES.map((p) => ({ path: p.path })),
  ];
}

export function headFor(path: string, abs: (path: string) => string): Head {
  const crumbs = (items: [string, string][]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(p) })),
  });

  if (path === '/') {
    const latest = BUILT_RELEASES[0];
    return {
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      canonical: '/',
      type: 'website',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'PlayzAnime',
          alternateName: ['Playz Anime', 'PlayzAnime for Windows'],
          description: HOME_DESCRIPTION,
          applicationCategory: 'MultimediaApplication',
          applicationSubCategory: 'Anime and manga player',
          operatingSystem: 'Windows 10, Windows 11',
          ...(latest ? { softwareVersion: latest.tag.replace(/^v/i, ''), datePublished: latest.date } : null),
          downloadUrl: DOWNLOAD_URL,
          installUrl: DOWNLOAD_URL,
          url: abs('/'),
          image: abs('/og.png'),
          screenshot: abs('/og.png'),
          isAccessibleForFree: true,
          license: REPO_URL,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          sameAs: [REPO_URL, WEB_APP_URL],
          releaseNotes: abs('/docs/changelog'),
          featureList: [
            'Watch anime with its own ad-free player',
            'Download episodes as MP4',
            'Read manga, manhwa and manhua',
            'Download chapters as CBZ',
            'Offline library',
            'Subtitles, skip intro, keyboard shortcuts',
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'PlayzAnime',
          url: abs('/'),
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: faqPlain(f.a) } })),
        },
      ],
    };
  }

  if (path === '/docs') {
    return {
      title: 'PlayzAnime Docs: guides, changelog and policies',
      description: 'How to install and use PlayzAnime for Windows and the web: watching, reading, downloads, offline mode, the changelog and the policies.',
      canonical: '/docs',
      type: 'website',
      jsonLd: [crumbs([['Home', '/'], ['Docs', '/docs']])],
    };
  }

  if (path === '/docs/changelog') {
    const latest = BUILT_RELEASES[0];
    return {
      title: CHANGELOG_TITLE,
      description: latest
        ? `What's new in PlayzAnime for Windows. Latest: ${releaseTitle(latest)}, released ${formatDate(latest.date)}. Every release with notes and downloads.`
        : 'Every release of PlayzAnime for Windows, with notes and downloads.',
      canonical: '/docs/changelog',
      type: 'website',
      jsonLd: [crumbs([['Home', '/'], ['Docs', '/docs'], ['Changelog', '/docs/changelog']])],
    };
  }

  const rel = BUILT_RELEASES.find((r) => releasePath(r) === path);
  if (rel) {
    const title = releaseTitle(rel);
    return {
      title: releasePageTitle(rel),
      description: releaseSummary(rel),
      canonical: path,
      type: 'article',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: title,
          description: releaseSummary(rel),
          datePublished: rel.date,
          dateModified: rel.date,
          url: abs(path),
          image: abs('/og.png'),
          author: { '@type': 'Organization', name: 'PlayzAnime', url: abs('/') },
          about: { '@type': 'SoftwareApplication', name: 'PlayzAnime', softwareVersion: rel.tag.replace(/^v/i, ''), operatingSystem: 'Windows', applicationCategory: 'MultimediaApplication' },
        },
        crumbs([['Home', '/'], ['Docs', '/docs'], ['Changelog', '/docs/changelog'], [rel.tag, path]]),
      ],
    };
  }

  if (path === '/docs/policies') {
    return {
      title: 'Policies · PlayzAnime Docs',
      description: 'Terms of service, disclaimer, privacy and copyright/DMCA for PlayzAnime.',
      canonical: '/docs/policies',
      type: 'website',
      jsonLd: [crumbs([['Home', '/'], ['Docs', '/docs'], ['Policies', '/docs/policies']])],
    };
  }

  const page = findPage(path);
  if (page) {
    return {
      title: `${page.title} · PlayzAnime Docs`,
      description: page.description || `${page.title}: part of the PlayzAnime docs.`,
      canonical: page.path,
      type: 'article',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: page.title,
          description: page.description,
          url: abs(page.path),
          articleSection: page.section,
          author: { '@type': 'Organization', name: 'PlayzAnime', url: abs('/') },
        },
        crumbs([['Home', '/'], ['Docs', '/docs'], [page.section, '/docs'], [page.title, page.path]]),
      ],
    };
  }

  return { title: 'Not found · PlayzAnime', description: HOME_DESCRIPTION, canonical: path, type: 'website', jsonLd: [] };
}
