import { createContext, useCallback, useContext, useEffect, useMemo, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';

/**
 * A tiny History API router. Paths inside the app never include the base path
 * ("/docs/watching/player"); `href()` adds it for links and `navigate()` strips it.
 */

const BASE = import.meta.env.BASE_URL.replace(/\/+$/, ''); // '' or '/some/sub/folder'

export function href(path: string): string {
  if (/^[a-z]+:|^\/\//i.test(path)) return path;
  if (path.startsWith('#')) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${clean}`;
}

/** A URL for a file in /public, respecting the base path. */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

function readLocation() {
  let path = decodeURI(window.location.pathname);
  if (BASE && (path === BASE || path.startsWith(`${BASE}/`))) path = path.slice(BASE.length);
  path = path.replace(/\/index\.html$/, '/').replace(/\/+$/, '') || '/';
  return { path, hash: decodeURIComponent(window.location.hash.slice(1)) };
}

interface RouterState {
  path: string;
  hash: string;
  navigate: (to: string, opts?: { replace?: boolean }) => void;
}

const RouterContext = createContext<RouterState | null>(null);

function scrollToHash(hash: string, smooth: boolean) {
  if (!hash) return false;
  const el = document.getElementById(hash);
  if (!el) return false;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: smooth && !reduce ? 'smooth' : 'auto', block: 'start' });
  return true;
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [loc, setLoc] = useState(readLocation);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    const onPop = () => setLoc(readLocation());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: string, opts?: { replace?: boolean }) => {
    const url = new URL(href(to), window.location.href);
    const samePage = url.pathname === window.location.pathname;
    if (opts?.replace) history.replaceState(null, '', url);
    else history.pushState(null, '', url);
    const next = readLocation();
    setLoc(next);
    if (samePage && next.hash) {
      scrollToHash(next.hash, true);
    } else if (!next.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  // After a route renders, bring a #hash into view (content may render a frame later).
  useEffect(() => {
    if (!loc.hash) return;
    let tries = 0;
    let raf = 0;
    const tick = () => {
      if (scrollToHash(loc.hash, false) || tries++ > 30) return;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loc.path, loc.hash]);

  const value = useMemo(() => ({ ...loc, navigate }), [loc, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter(): RouterState {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter outside RouterProvider');
  return ctx;
}

/** Handle clicks on in-app links: left click without modifiers stays in the app. */
export function shouldIntercept(e: MouseEvent | globalThis.MouseEvent, anchor: HTMLAnchorElement): boolean {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false;
  if (anchor.target && anchor.target !== '_self') return false;
  if (anchor.hasAttribute('download')) return false;
  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return false;
  if (BASE && !(url.pathname === BASE || url.pathname.startsWith(`${BASE}/`))) return false;
  // Files in /public (images, the social card) are not routes.
  if (/\.[a-z0-9]{2,5}$/i.test(url.pathname)) return false;
  return true;
}

export function appPathFromUrl(url: URL): string {
  let path = decodeURI(url.pathname);
  if (BASE && path.startsWith(BASE)) path = path.slice(BASE.length);
  return `${path || '/'}${url.hash}`;
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string };

export function Link({ to, onClick, children, ...rest }: LinkProps) {
  const { navigate } = useRouter();
  const external = /^[a-z]+:|^\/\//i.test(to);
  return (
    <a
      href={href(to)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : null)}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (external || !shouldIntercept(e, e.currentTarget)) return;
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}
