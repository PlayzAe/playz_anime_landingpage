import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { Icon, type IconName } from '../components/Icon';
import { Logo } from '../components/Logo';
import { DOWNLOAD_URL, GITHUB_URL } from '../lib/links';
import { appPathFromUrl, href, Link, shouldIntercept, useRouter } from '../lib/router';
import { findRelease, formatDate, formatSize, releaseBody, releasePageTitle, releasePath, releaseSlug, releaseSummary, releaseTitle, RELEASES_REPO, useLiveReleases, type Release } from './changelog';
import { findPage, PAGES, renderMarkdown, search, sectionsWithPages, type DocPage, type Heading } from './content';
import './docs.css';

/*
 * The docs are their own site: their own header, a sidebar of every page, a Ctrl K search,
 * and the changelog, which is written as GitHub Releases and shown here.
 */

const SITE_REPO = 'PlayzAe/playz_anime_landingpage';

const SECTION_ICON: Record<string, IconName> = {
  'Getting started': 'bolt',
  Watching: 'play',
  Reading: 'manga',
  Downloads: 'downloads',
  Offline: 'offline',
  Profiles: 'profiles',
  Settings: 'settings',
  'Web app': 'globe',
  Troubleshooting: 'alert',
  FAQ: 'info',
  Development: 'hash',
  Policies: 'shield',
};

interface NavItem {
  path: string;
  title: string;
  icon: IconName;
  badge?: string;
}

/** A page's own icon: an `icon:` line in its frontmatter wins, then this list, then its section's. */
const PAGE_ICON: Record<string, IconName> = {
  introduction: 'info',
  'install-on-windows': 'windows',
  'first-launch': 'bolt',
  'search-library-and-schedule': 'search',
  'updating-and-uninstalling': 'refresh',
  'where-your-data-lives': 'folder',
  'the-player': 'play',
  'subtitles-and-audio': 'subtitles',
  'skip-intro-and-up-next': 'skip',
  'embed-player': 'globe',
  'keyboard-shortcuts': 'keyboard',
  'sources-and-auto-pick': 'list',
  'the-reader': 'manga',
  'manhwa-and-webtoons': 'fullscreen',
  'read-from-another-source': 'share',
  'the-downloads-page': 'downloads',
  'downloading-episodes': 'tv',
  'downloading-chapters': 'manga',
  'folders-and-naming': 'folder',
  quality: 'settings',
  'resume-and-errors': 'alert',
  'about-the-web-app': 'globe',
  'terms-of-service': 'list',
  disclaimer: 'info',
  privacy: 'shield',
  'copyright-and-dmca': 'alert',
};

const iconFor = (p: DocPage): IconName => (p.icon as IconName) || PAGE_ICON[p.slug] || SECTION_ICON[p.section] || 'list';

function navSections(): { name: string; items: NavItem[] }[] {
  return [
    { name: '', items: [{ path: '/docs', title: 'Overview', icon: 'bolt' }, { path: '/docs/changelog', title: 'Changelog', icon: 'hash', badge: 'What’s new' }] },
    ...sectionsWithPages().map((s) => ({ name: s.name, items: s.pages.map((p) => ({ path: p.path, title: p.title, icon: iconFor(p), badge: p.badge })) })),
  ];
}

/** Keeps the tab title and description right while moving between pages. */
function useHead(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, description]);
}

export function Docs() {
  const { path } = useRouter();
  const { releases, settled } = useLiveReleases();
  const [searching, setSearching] = useState(false);
  const [menu, setMenu] = useState(false);
  useEffect(() => setMenu(false), [path]);

  // Ctrl K / Cmd K anywhere, or "/" when not typing, opens search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest('input, textarea');
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearching((s) => !s);
      } else if (e.key === '/' && !typing) {
        e.preventDefault();
        setSearching(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const page = findPage(path);
  const releaseMatch = /^\/docs\/changelog\/([^/]+)$/.exec(path);
  const currentNav = page?.path ?? (path.startsWith('/docs/changelog') ? '/docs/changelog' : path);

  let main: ReactNode;
  if (path === '/docs') main = <DocsHome releases={releases} />;
  else if (path === '/docs/changelog') main = <Changelog releases={releases} />;
  else if (releaseMatch) {
    const r = findRelease(releaseMatch[1], releases);
    // A release newer than this build is fetched from GitHub, so wait for it before saying 404.
    main = r ? <ReleasePage release={r} releases={releases} /> : settled ? <NotFound /> : <p className="doc-lede">Loading release notes…</p>;
  } else if (path === '/docs/policies') main = <SectionIndex section="Policies" />;
  else if (page) main = <Article page={page} />;
  else main = <NotFound />;

  return (
    <div className="docs-app">
      <header className="dh">
        <div className="dh-inner">
          <button type="button" className="dh-menu" aria-expanded={menu} aria-controls="docs-nav" onClick={() => setMenu((m) => !m)}>
            <Icon name={menu ? 'close' : 'menu'} size={20} />
            <span className="sr-only">Docs menu</span>
          </button>
          <Link to="/docs" className="dh-brand" aria-label="PlayzAnime Docs home">
            <Logo size={26} title="" />
            <span className="dh-name">PlayzAnime</span>
            <span className="dh-tag">Docs</span>
          </Link>
          <button type="button" className="dh-search" onClick={() => setSearching(true)}>
            <Icon name="search" size={16} />
            <span className="dh-search-label">Search the docs</span>
            <span className="dh-keys">
              <kbd>Ctrl</kbd>
              <kbd>K</kbd>
            </span>
          </button>
          <nav className="dh-links" aria-label="Docs">
            <Link to="/docs/changelog" className={path.startsWith('/docs/changelog') ? 'is-current' : undefined}>
              Changelog
            </Link>
            <Link to="/">Home</Link>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              GitHub <Icon name="external" size={13} />
            </a>
          </nav>
        </div>
      </header>

      <div className="docs-layout">
        <aside id="docs-nav" className={`docs-sidebar${menu ? ' is-open' : ''}`} aria-label="All docs">
          {navSections().map((s) => (
            <div key={s.name || 'top'} className="ds-section">
              {s.name && <h2>{s.name}</h2>}
              <ul>
                {s.items.map((it) => {
                  const on = it.path === currentNav;
                  return (
                    <li key={it.path}>
                      <Link to={it.path} className={`ds-link${on ? ' is-current' : ''}`} aria-current={on ? 'page' : undefined}>
                        <Icon name={it.icon} size={16} />
                        <span>{it.title}</span>
                        {it.badge && <span className="ds-badge">{it.badge}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <nav className="ds-more" aria-label="More">
            <Link to="/" className="ds-link">
              <Icon name="arrowLeft" size={16} />
              <span>PlayzAnime home</span>
            </Link>
            <a href={DOWNLOAD_URL} className="ds-link" target="_blank" rel="noopener noreferrer">
              <Icon name="windows" size={16} />
              <span>Download for Windows</span>
            </a>
            <a href={GITHUB_URL} className="ds-link" target="_blank" rel="noopener noreferrer">
              <Icon name="github" size={16} />
              <span>GitHub</span>
            </a>
          </nav>
        </aside>
        <main id="main" className="docs-content">
          {main}
          <DocsFooter />
        </main>
      </div>

      <AnimatePresence>{searching && <SearchPalette releases={releases} onClose={() => setSearching(false)} />}</AnimatePresence>
    </div>
  );
}

// ── Docs home ───────────────────────────────────────────────────────────────

const START_HERE: { path: string; title: string; body: string; icon: IconName }[] = [
  { path: '/docs/getting-started/install-on-windows', title: 'Install on Windows', body: 'Installer or portable exe, and getting past SmartScreen.', icon: 'windows' },
  { path: '/docs/getting-started/first-launch', title: 'First launch', body: 'What the one-time setup does, and your profile.', icon: 'bolt' },
  { path: '/docs/watching/the-player', title: 'The player', body: 'Controls, subtitles, skip intro and shortcuts.', icon: 'play' },
  { path: '/docs/reading/the-reader', title: 'The reader', body: 'Page and scroll modes, manhwa, sources.', icon: 'manga' },
  { path: '/docs/downloads/downloading-episodes', title: 'Downloads', body: 'Episodes as MP4, chapters as CBZ, resume anywhere.', icon: 'downloads' },
  { path: '/docs/web-app/about-the-web-app', title: 'Web app', body: 'What works in the browser and what needs the app.', icon: 'globe' },
];

function DocsHome({ releases }: { releases: Release[] }) {
  useHead('PlayzAnime Docs: guides, changelog and policies', 'Everything about PlayzAnime for Windows and the web: install, watch, read, download, the changelog and the rules.');
  const latest = releases[0];
  return (
    <div className="dhome">
      <section className="dhome-hero">
        <p className="eyebrow">Documentation</p>
        <h1 className="display">Everything about PlayzAnime</h1>
        <p className="lede">Install it, watch and read with it, keep things offline, and see what changed in every release.</p>
      </section>

      {latest && (
        <Link to={releasePath(latest)} className="latest-card">
          <span className="latest-tag">Latest release</span>
          <span className="latest-version display">{latest.tag}</span>
          <span className="latest-title">{releaseTitle(latest)}</span>
          <span className="latest-date">{formatDate(latest.date)}</span>
          <span className="latest-summary">{releaseSummary(latest)}</span>
          <span className="latest-cta">
            Read the notes <Icon name="arrowRight" size={15} />
          </span>
        </Link>
      )}

      <h2 className="dhome-h2">Start here</h2>
      <div className="dhome-cards">
        {START_HERE.filter((c) => findPage(c.path)).map((c) => (
          <Link key={c.path} to={c.path} className="dcard">
            <span className="dcard-icon">
              <Icon name={c.icon} size={18} />
            </span>
            <span className="dcard-title">{c.title}</span>
            <span className="dcard-body">{c.body}</span>
          </Link>
        ))}
      </div>

      <h2 className="dhome-h2">All topics</h2>
      <div className="dhome-topics">
        {sectionsWithPages().map((s) => (
          <div key={s.name} className="dtopic">
            <h3>
              <Icon name={SECTION_ICON[s.name] ?? 'list'} size={16} /> {s.name}
            </h3>
            <ul>
              {s.pages.map((p) => (
                <li key={p.path}>
                  <Link to={p.path}>{p.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionIndex({ section }: { section: string }) {
  useHead(`${section} · PlayzAnime Docs`, 'How PlayzAnime works with the law, rights holders and your data.');
  return (
    <div className="dhome">
      <section className="dhome-hero">
        <p className="eyebrow">Docs</p>
        <h1 className="display">{section}</h1>
        <p className="lede">How PlayzAnime works with the law, rights holders and your data.</p>
      </section>
      <div className="dhome-cards">
        {PAGES.filter((p) => p.section === section).map((p) => (
          <Link key={p.path} to={p.path} className="dcard">
            <span className="dcard-icon">
              <Icon name="shield" size={18} />
            </span>
            <span className="dcard-title">{p.title}</span>
            <span className="dcard-body">{p.description}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── Changelog ───────────────────────────────────────────────────────────────

function CopyMarkdown({ markdown }: { markdown: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="dbtn"
      onClick={() => {
        void navigator.clipboard?.writeText(markdown).then(() => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        });
      }}
    >
      <Icon name={copied ? 'check' : 'copy'} size={15} />
      {copied ? 'Copied' : 'Copy Markdown'}
    </button>
  );
}

function Downloads({ release }: { release: Release }) {
  const files = release.assets.filter((a) => /\.(exe|msi|zip|7z|dmg|AppImage)$/i.test(a.name));
  if (!files.length) return null;
  return (
    <div className="rl-downloads">
      {files.map((a) => (
        <a key={a.url} className={`dbtn${/setup|install/i.test(a.name) ? ' is-primary' : ''}`} href={a.url} rel="noopener noreferrer">
          <Icon name="downloads" size={15} />
          <span>{/portable/i.test(a.name) ? 'Portable' : /setup|install/i.test(a.name) ? 'Installer' : a.name}</span>
          <span className="rl-size">{formatSize(a.size)}</span>
        </a>
      ))}
    </div>
  );
}

function Badges({ release, latest }: { release: Release; latest: boolean }) {
  return (
    <>
      {latest && <span className="rl-badge is-latest">Latest</span>}
      {release.prerelease && <span className="rl-badge">Pre-release</span>}
    </>
  );
}

/** Keeps in-page links (and links inside rendered Markdown) inside the app. */
function useInternalLinks() {
  const { navigate } = useRouter();
  return (e: MouseEvent<HTMLElement>) => {
    const a = (e.target as HTMLElement).closest('a');
    if (!a || !shouldIntercept(e, a)) return;
    e.preventDefault();
    navigate(appPathFromUrl(new URL(a.href)));
  };
}

function Changelog({ releases }: { releases: Release[] }) {
  useHead('PlayzAnime changelog: release notes for every version', 'Every release of PlayzAnime for Windows: new features, fixes and downloads, newest first.');
  const onClick = useInternalLinks();
  const all = releases.map((r) => `## ${releaseTitle(r)}\n_${formatDate(r.date)}_\n\n${releaseBody(r)}`).join('\n\n---\n\n');
  return (
    <div className="docs-article-wrap">
      <article className="docs-article">
        <p className="docs-crumb">
          <Link to="/docs">Docs</Link>
          <Icon name="chevronRight" size={14} />
          <span>Changelog</span>
        </p>
        <h1 className="doc-title display">Changelog</h1>
        <p className="doc-lede">Every release of PlayzAnime for Windows, newest first. The web app follows along.</p>
        <div className="doc-actions">
          <CopyMarkdown markdown={`# PlayzAnime changelog\n\n${all}`} />
          <a className="dbtn" href={`https://github.com/${RELEASES_REPO}/releases`} target="_blank" rel="noopener noreferrer">
            <Icon name="github" size={15} /> Releases on GitHub
          </a>
        </div>
        {releases.length === 0 && <p className="doc-lede">No releases yet.</p>}
        <ol className="timeline">
          {releases.map((r, i) => {
            const { html } = renderMarkdown(releaseBody(r), { shift: 2, prefix: `${releaseSlug(r)}-`, untrusted: true });
            return (
              <li key={r.tag} id={releaseSlug(r)} className="tl-entry">
                <div className="tl-meta">
                  <Link to={releasePath(r)} className="tl-version display">
                    {r.tag}
                  </Link>
                  <time dateTime={r.date}>{formatDate(r.date)}</time>
                  <span className="tl-badges">
                    <Badges release={r} latest={i === 0} />
                  </span>
                </div>
                <div className="tl-body">
                  <h2 className="tl-title">
                    <Link to={releasePath(r)}>{releaseTitle(r)}</Link>
                  </h2>
                  <div className="prose" onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />
                  <Downloads release={r} />
                </div>
              </li>
            );
          })}
        </ol>
      </article>
      {releases.length > 1 && <OnThisPage headings={releases.map((r) => ({ depth: 2, id: releaseSlug(r), text: r.tag }))} title="Versions" />}
    </div>
  );
}

function ReleasePage({ release, releases }: { release: Release; releases: Release[] }) {
  const title = releaseTitle(release);
  useHead(releasePageTitle(release), releaseSummary(release));
  const onClick = useInternalLinks();
  const { html, headings } = useMemo(() => renderMarkdown(releaseBody(release), { shift: 1, untrusted: true }), [release]);
  const i = releases.indexOf(release);
  const newer = releases[i - 1];
  const older = releases[i + 1];
  return (
    <div className="docs-article-wrap">
      <article className="docs-article">
        <p className="docs-crumb">
          <Link to="/docs">Docs</Link>
          <Icon name="chevronRight" size={14} />
          <Link to="/docs/changelog">Changelog</Link>
          <Icon name="chevronRight" size={14} />
          <span>{release.tag}</span>
        </p>
        <h1 className="doc-title display">{title}</h1>
        <p className="rl-meta">
          <time dateTime={release.date}>{formatDate(release.date)}</time>
          <span className="rl-tag">{release.tag}</span>
          <Badges release={release} latest={i === 0} />
        </p>
        <div className="doc-actions">
          <Downloads release={release} />
          <CopyMarkdown markdown={release.body} />
          <a className="dbtn" href={release.url} target="_blank" rel="noopener noreferrer">
            <Icon name="github" size={15} /> On GitHub
          </a>
        </div>
        <div className="prose" onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />
        <nav className="docs-pager" aria-label="Newer and older releases">
          {older ? (
            <Link to={releasePath(older)} className="docs-pager-link">
              <span>Older</span>
              {older.tag}
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link to={releasePath(newer)} className="docs-pager-link is-next">
              <span>Newer</span>
              {newer.tag}
            </Link>
          )}
        </nav>
      </article>
      {headings.length > 1 && <OnThisPage headings={headings} />}
    </div>
  );
}

// ── Article ─────────────────────────────────────────────────────────────────

function Article({ page }: { page: DocPage }) {
  useHead(`${page.title} · PlayzAnime Docs`, page.description);
  const onClick = useInternalLinks();
  const { html, headings } = useMemo(() => renderMarkdown(page.body), [page]);
  const i = PAGES.indexOf(page);
  const prev = PAGES[i - 1];
  const next = PAGES[i + 1];
  return (
    <div className="docs-article-wrap">
      <article className="docs-article">
        <p className="docs-crumb">
          <Link to="/docs">Docs</Link>
          <Icon name="chevronRight" size={14} />
          <span>{page.section}</span>
        </p>
        <div className="prose" onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />
        <p className="doc-edit">
          <a href={`https://github.com/${SITE_REPO}/edit/main/content/docs/${page.sectionSlug}/${page.slug}.md`} target="_blank" rel="noopener noreferrer">
            <Icon name="github" size={14} /> Edit this page on GitHub
          </a>
        </p>
        <nav className="docs-pager" aria-label="Previous and next">
          {prev ? (
            <Link to={prev.path} className="docs-pager-link">
              <span>Previous</span>
              {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={next.path} className="docs-pager-link is-next">
              <span>Next</span>
              {next.title}
            </Link>
          )}
        </nav>
      </article>
      {headings.length > 1 && <OnThisPage headings={headings} />}
    </div>
  );
}

/** Highlights the section being read. */
function OnThisPage({ headings, title = 'On this page' }: { headings: Heading[]; title?: string }) {
  const [active, setActive] = useState(headings[0]?.id);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-80px 0px -65% 0px' },
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [headings]);
  return (
    <aside className="docs-toc" aria-label={title}>
      <h2>{title}</h2>
      <ul>
        {headings.map((h) => (
          <li key={h.id} className={`depth-${h.depth}${h.id === active ? ' is-active' : ''}`}>
            <a href={`#${h.id}`}>{h.text}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

// ── Search ──────────────────────────────────────────────────────────────────

interface Hit {
  to: string;
  title: string;
  where: string;
  icon: IconName;
}

function SearchPalette({ releases, onClose }: { releases: Release[]; onClose: () => void }) {
  const { navigate } = useRouter();
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const hits = useMemo<Hit[]>(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) {
      return [
        { to: '/docs/changelog', title: 'Changelog', where: 'What’s new', icon: 'list' },
        ...START_HERE.map((c) => ({ to: c.path, title: c.title, where: 'Start here', icon: c.icon })),
      ];
    }
    const docs = search(q, 10).map((h) => ({
      to: h.anchor ? `${h.page.path}#${h.anchor}` : h.page.path,
      title: h.heading ?? h.page.title,
      where: h.heading ? h.page.title : h.page.section,
      icon: iconFor(h.page),
    }));
    const rel = releases
      .filter((r) => words.every((w) => `${r.tag} ${r.name} ${r.body}`.toLowerCase().includes(w)))
      .slice(0, 5)
      .map((r) => ({ to: releasePath(r), title: releaseTitle(r), where: `Changelog · ${formatDate(r.date)}`, icon: 'list' as IconName }));
    return [...docs, ...rel];
  }, [q, releases]);

  useEffect(() => setSel(0), [q]);
  useEffect(() => input.current?.focus(), []);

  const go = (h: Hit | undefined) => {
    if (!h) return;
    navigate(h.to);
    onClose();
  };

  return (
    <motion.div className="sp-backdrop" onMouseDown={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
      <motion.div
        className="sp"
        role="dialog"
        aria-modal="true"
        aria-label="Search the docs"
        onMouseDown={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 520, damping: 36 }}
      >
        <label className="sp-input">
          <Icon name="search" size={18} />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') (e.preventDefault(), setSel((s) => Math.min(s + 1, hits.length - 1)));
              else if (e.key === 'ArrowUp') (e.preventDefault(), setSel((s) => Math.max(s - 1, 0)));
              else if (e.key === 'Enter') go(hits[sel]);
              else if (e.key === 'Escape') onClose();
            }}
            placeholder="Search guides, settings and release notes"
            aria-label="Search"
            role="combobox"
            aria-expanded={hits.length > 0}
            aria-controls="sp-results"
          />
          <kbd>Esc</kbd>
        </label>
        <ul id="sp-results" className="sp-results" role="listbox">
          {hits.length === 0 && <li className="sp-empty">Nothing matches “{q}”.</li>}
          {hits.map((h, i) => (
            <li key={h.to + i} role="option" aria-selected={i === sel}>
              <a href={href(h.to)} className={i === sel ? 'is-selected' : undefined} onClick={(e) => (e.preventDefault(), go(h))} onMouseEnter={() => setSel(i)}>
                <Icon name={h.icon} size={16} />
                <span className="sp-title">{h.title}</span>
                <span className="sp-where">{h.where}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="sp-foot">
          <kbd>↑</kbd>
          <kbd>↓</kbd> to move, <kbd>Enter</kbd> to open
        </p>
      </motion.div>
    </motion.div>
  );
}

// ── Footer & not found ──────────────────────────────────────────────────────

function DocsFooter() {
  return (
    <footer className="docs-foot">
      <p>
        <strong>PlayzAnime doesn’t host, upload or distribute any media.</strong> See the <Link to="/docs/policies/disclaimer">disclaimer</Link>.
      </p>
      <nav aria-label="More">
        <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
          Download for Windows
        </a>
        <Link to="/docs/policies/terms-of-service">Terms</Link>
        <Link to="/docs/policies/privacy">Privacy</Link>
        <Link to="/docs/policies/copyright-and-dmca">Copyright &amp; DMCA</Link>
      </nav>
    </footer>
  );
}

function NotFound() {
  useHead('Not found · PlayzAnime Docs');
  return (
    <div className="dhome">
      <section className="dhome-hero">
        <p className="eyebrow">404</p>
        <h1 className="display">That page moved</h1>
        <p className="lede">
          Press <kbd>Ctrl</kbd> <kbd>K</kbd> to search, or start from the <Link to="/docs">docs home</Link>.
        </p>
      </section>
    </div>
  );
}
