import { Marked, type Tokens } from 'marked';
import { href } from '../lib/router';

/*
 * The docs are plain Markdown files in content/docs/<section>/<page>.md, each
 * starting with a small frontmatter block (title, description, section, order).
 * They're bundled at build time, so the site stays fully static.
 */

export const SECTIONS = ['Getting started', 'Watching', 'Reading', 'Downloads', 'Offline', 'Profiles', 'Settings', 'Web app', 'Troubleshooting', 'FAQ', 'Development', 'Policies'];

export interface DocPage {
  /** e.g. "/docs/watching/the-player" */
  path: string;
  sectionSlug: string;
  slug: string;
  title: string;
  description: string;
  section: string;
  order: number;
  body: string;
}

export interface Heading {
  depth: 2 | 3;
  text: string;
  id: string;
}

const files = import.meta.glob('../../content/docs/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function frontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!m) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^([a-zA-Z]+):\s*(.*)$/.exec(line);
    if (kv) meta[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return { meta, body: raw.slice(m[0].length) };
}

export const PAGES: DocPage[] = Object.entries(files)
  .map(([file, raw]) => {
    const parts = file.replace(/\\/g, '/').split('/');
    const slug = parts[parts.length - 1].replace(/\.md$/, '');
    const sectionSlug = parts[parts.length - 2];
    const { meta, body } = frontmatter(raw);
    return {
      path: `/docs/${sectionSlug}/${slug}`,
      sectionSlug,
      slug,
      title: meta.title || slug,
      description: meta.description || '',
      section: meta.section || 'Getting started',
      order: Number(meta.order) || 99,
      body,
    };
  })
  .sort((a, b) => {
    const sa = SECTIONS.indexOf(a.section);
    const sb = SECTIONS.indexOf(b.section);
    return (sa < 0 ? 99 : sa) - (sb < 0 ? 99 : sb) || a.order - b.order || a.title.localeCompare(b.title);
  });

export function sectionsWithPages(): { name: string; slug: string; pages: DocPage[] }[] {
  const out: { name: string; slug: string; pages: DocPage[] }[] = [];
  for (const p of PAGES) {
    let s = out.find((x) => x.name === p.section);
    if (!s) out.push((s = { name: p.section, slug: p.sectionSlug, pages: [] }));
    s.pages.push(p);
  }
  return out;
}

const DOC_ALIASES: Record<string, string> = {
  '/docs/policies/dmca': '/docs/policies/copyright-and-dmca',
  '/docs/dmca': '/docs/policies/copyright-and-dmca',
  '/dmca': '/docs/policies/copyright-and-dmca',
  '/docs/policies/copyright': '/docs/policies/copyright-and-dmca',
  '/docs/copyright': '/docs/policies/copyright-and-dmca',
};

export function findPage(path: string): DocPage | undefined {
  const clean = path.replace(/\/+$/, '');
  const target = DOC_ALIASES[clean] || clean;
  return PAGES.find((p) => p.path === target);
}

// ── Rendering ───────────────────────────────────────────────────────────────

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;|&#\d+;/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

const CALLOUTS: Record<string, string> = { NOTE: 'Note', TIP: 'Tip', IMPORTANT: 'Important', WARNING: 'Warning', CAUTION: 'Caution' };

/** GitHub-style callouts (> [!NOTE]) become boxes whose insides are still Markdown. */
function callouts(md: string): string {
  const lines = md.split(/\r?\n/);
  const out: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const m = /^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*$/.exec(lines[i]);
    if (!m) {
      out.push(lines[i]);
      continue;
    }
    const inner: string[] = [];
    while (i + 1 < lines.length && /^>/.test(lines[i + 1])) inner.push(lines[++i].replace(/^>\s?/, ''));
    const kind = m[1].toLowerCase();
    out.push('', `<div class="callout is-${kind}" role="note"><p class="callout-title">${CALLOUTS[m[1]]}</p>`, '', ...inner, '', '</div>', '');
  }
  return out.join('\n');
}

const marked = new Marked({
  gfm: true,
  renderer: {
    heading({ tokens, depth }: Tokens.Heading) {
      const html = this.parser.parseInline(tokens);
      const id = slugify(html);
      if (depth === 1) return `<h1>${html}</h1>\n`;
      return `<h${depth} id="${id}"><a class="anchor" href="#${id}" aria-hidden="true" tabindex="-1">#</a>${html}</h${depth}>\n`;
    },
    link({ href: target, title, tokens }: Tokens.Link) {
      const text = this.parser.parseInline(tokens);
      const external = /^[a-z]+:/i.test(target);
      const url = external || target.startsWith('#') ? target : href(target);
      const t = title ? ` title="${title}"` : '';
      return external ? `<a href="${url}"${t} target="_blank" rel="noopener noreferrer">${text}</a>` : `<a href="${url}"${t}>${text}</a>`;
    },
  },
});

export function render(page: DocPage): { html: string; headings: Heading[] } {
  const html = marked.parse(callouts(page.body), { async: false }) as string;
  const headings: Heading[] = [];
  for (const m of html.matchAll(/<h([23]) id="([^"]+)"><a[^>]*>#<\/a>([\s\S]*?)<\/h\1>/g)) {
    headings.push({ depth: Number(m[1]) as 2 | 3, id: m[2], text: m[3].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"') });
  }
  return { html, headings };
}

// ── Search ──────────────────────────────────────────────────────────────────

export interface Hit {
  page: DocPage;
  heading: string | null;
  anchor: string | null;
}

const index = PAGES.flatMap((page) => {
  const rows: { page: DocPage; heading: string | null; anchor: string | null; hay: string }[] = [
    { page, heading: null, anchor: null, hay: `${page.title} ${page.description} ${page.section}`.toLowerCase() },
  ];
  for (const m of page.body.matchAll(/^#{2,3}\s+(.+)$/gm)) {
    const text = m[1].replace(/[`*_]/g, '').trim();
    rows.push({ page, heading: text, anchor: slugify(text), hay: `${text} ${page.title}`.toLowerCase() });
  }
  return rows;
});

/** Every word must appear; page titles rank above headings. */
export function search(query: string, limit = 12): Hit[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return index
    .filter((r) => words.every((w) => r.hay.includes(w)))
    .sort((a, b) => Number(a.heading !== null) - Number(b.heading !== null))
    .slice(0, limit)
    .map(({ page, heading, anchor }) => ({ page, heading, anchor }));
}
