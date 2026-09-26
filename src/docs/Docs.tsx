import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import { Icon } from '../components/Icon';
import { appPathFromUrl, href, Link, shouldIntercept, useRouter } from '../lib/router';
import { findPage, PAGES, render, search, sectionsWithPages, type DocPage, type Heading } from './content';
import './docs.css';

function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

/** /docs, /docs/policies and /docs/<section>/<page>. */
export function Docs() {
  const { path } = useRouter();
  const page = findPage(path);
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);

  let main;
  if (path === '/docs') main = <DocsHome />;
  else if (path === '/docs/policies') main = <SectionIndex section="Policies" />;
  else if (page) main = <Article page={page} />;
  else main = <NotFound />;

  return (
    <div className="docs page">
      <button type="button" className="docs-nav-toggle" aria-expanded={open} aria-controls="docs-nav" onClick={() => setOpen((o) => !o)}>
        <Icon name={open ? 'close' : 'list'} size={18} />
        {open ? 'Close' : 'All docs'}
      </button>
      <aside id="docs-nav" className={`docs-nav${open ? ' is-open' : ''}`} aria-label="Docs">
        <SearchBox />
        <nav>
          {sectionsWithPages().map((s) => (
            <div key={s.name} className="docs-nav-section">
              <h2>{s.name}</h2>
              <ul>
                {s.pages.map((p) => (
                  <li key={p.path}>
                    <Link to={p.path} className={p.path === path ? 'is-current' : undefined} aria-current={p.path === path ? 'page' : undefined}>
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
      <div className="docs-main">{main}</div>
    </div>
  );
}

function DocsHome() {
  usePageTitle('Docs · PlayzAnime');
  return (
    <div className="docs-home">
      <h1 className="display">Docs</h1>
      <p className="docs-lede">Everything about PlayzAnime for Windows and the web: installing, watching, reading, downloading, profiles and the rules.</p>
      <div className="docs-cards">
        {sectionsWithPages().map((s) => (
          <Link key={s.name} to={s.name === 'Policies' ? '/docs/policies' : s.pages[0].path} className="docs-card">
            <span className="docs-card-title">{s.name}</span>
            <span className="docs-card-pages">{s.pages.map((p) => p.title).join(' · ')}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function SectionIndex({ section }: { section: string }) {
  usePageTitle(`${section} · PlayzAnime`);
  const pages = PAGES.filter((p) => p.section === section);
  return (
    <div className="docs-home">
      <h1 className="display">{section}</h1>
      <p className="docs-lede">How PlayzAnime works with the law, rights holders and your data.</p>
      <div className="docs-cards">
        {pages.map((p) => (
          <Link key={p.path} to={p.path} className="docs-card">
            <span className="docs-card-title">{p.title}</span>
            <span className="docs-card-pages">{p.description}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Article({ page }: { page: DocPage }) {
  usePageTitle(`${page.title} · PlayzAnime Docs`);
  const { navigate } = useRouter();
  const { html, headings } = useMemo(() => render(page), [page]);
  const i = PAGES.indexOf(page);
  const prev = PAGES[i - 1];
  const next = PAGES[i + 1];

  // Links inside the Markdown stay in the app instead of reloading the page.
  const onClick = (e: MouseEvent<HTMLElement>) => {
    const a = (e.target as HTMLElement).closest('a');
    if (!a || !shouldIntercept(e, a)) return;
    e.preventDefault();
    navigate(appPathFromUrl(new URL(a.href)));
  };

  return (
    <div className="docs-article-wrap">
      <article className="docs-article">
        <p className="docs-crumb">
          <Link to="/docs">Docs</Link>
          <Icon name="chevronRight" size={14} />
          <span>{page.section}</span>
        </p>
        <div className="prose" onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />
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
function OnThisPage({ headings }: { headings: Heading[] }) {
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
    <aside className="docs-toc" aria-label="On this page">
      <h2>On this page</h2>
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

function SearchBox() {
  const { navigate } = useRouter();
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const hits = useMemo(() => search(q), [q]);
  useEffect(() => setSel(0), [q]);

  // "/" jumps to search, like the app's Ctrl K.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && !(e.target as HTMLElement)?.closest('input, textarea')) {
        e.preventDefault();
        input.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const go = (i: number) => {
    const h = hits[i];
    if (!h) return;
    navigate(h.anchor ? `${h.page.path}#${h.anchor}` : h.page.path);
    setQ('');
  };

  return (
    <div className="docs-search">
      <label className="docs-search-box">
        <Icon name="search" size={16} />
        <input
          ref={input}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') (e.preventDefault(), setSel((s) => Math.min(s + 1, hits.length - 1)));
            else if (e.key === 'ArrowUp') (e.preventDefault(), setSel((s) => Math.max(s - 1, 0)));
            else if (e.key === 'Enter') go(sel);
            else if (e.key === 'Escape') setQ('');
          }}
          placeholder="Search the docs"
          aria-label="Search the docs"
          role="combobox"
          aria-expanded={hits.length > 0}
          aria-controls="docs-search-results"
        />
        <kbd>/</kbd>
      </label>
      {q && (
        <ul id="docs-search-results" className="docs-search-results" role="listbox">
          {hits.length === 0 && <li className="docs-search-empty">Nothing matches “{q}”.</li>}
          {hits.map((h, i) => (
            <li key={`${h.page.path}#${h.anchor ?? ''}`} role="option" aria-selected={i === sel}>
              <a href={href(h.anchor ? `${h.page.path}#${h.anchor}` : h.page.path)} className={i === sel ? 'is-selected' : undefined} onClick={(e) => (e.preventDefault(), go(i))} onMouseEnter={() => setSel(i)}>
                <span className="hit-title">{h.heading ?? h.page.title}</span>
                <span className="hit-where">{h.heading ? h.page.title : h.page.section}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function NotFound() {
  usePageTitle('Not found · PlayzAnime Docs');
  return (
    <div className="docs-home">
      <h1 className="display">That page moved</h1>
      <p className="docs-lede">
        Try the search, or start from the <Link to="/docs">docs home</Link>.
      </p>
    </div>
  );
}
