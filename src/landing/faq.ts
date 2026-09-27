/*
 * The FAQ lives here as data so the landing page and the search-engine FAQ markup (the
 * FAQPage JSON-LD written at build time) always say the same thing. Links use Markdown:
 * [text](/docs/...).
 */

export const FAQ: { q: string; a: string }[] = [
  { q: 'Is PlayzAnime free?', a: 'Yes. No ads, no subscription, no premium tier. It is open source.' },
  {
    q: 'Does PlayzAnime host anime or manga?',
    a: "No. It shows content that third-party websites already publish, and metadata comes from AniList. PlayzAnime doesn't host, upload or sell any of it. See the [disclaimer](/docs/policies/disclaimer).",
  },
  { q: 'Do I need an account?', a: 'No. There are no accounts. Your lists, history and profile stay on your device or in your browser.' },
  {
    q: 'Can I download episodes on the web?',
    a: 'Downloads and offline mode are in the Windows app. The web app streams and reads, and shows you where to get the app when you want to keep something.',
  },
  {
    q: 'Windows says "Windows protected your PC". Is it safe?',
    a: 'That warning appears for apps without a paid code-signing certificate. Click More info, then Run anyway. The source code is public if you want to check it or build it yourself.',
  },
  {
    q: 'A title has no chapters or won’t play. What now?',
    a: 'Sources come and go. Try another source from the chapter list, or the embed player for episodes. See [a stream won’t load](/docs/troubleshooting/stream-wont-load) and [no chapters found](/docs/troubleshooting/no-chapters-found).',
  },
  {
    q: 'I own content that appears in PlayzAnime.',
    a: 'Send a notice as described in [Copyright & DMCA](/docs/policies/copyright-and-dmca). We act on valid notices within 72 hours.',
  },
];

/** Splits an answer into text and links: [text](/path). */
export function faqParts(a: string): (string | { text: string; to: string })[] {
  const out: (string | { text: string; to: string })[] = [];
  let last = 0;
  for (const m of a.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
    if (m.index > last) out.push(a.slice(last, m.index));
    out.push({ text: m[1], to: m[2] });
    last = m.index + m[0].length;
  }
  if (last < a.length) out.push(a.slice(last));
  return out;
}

export const faqPlain = (a: string) => a.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
