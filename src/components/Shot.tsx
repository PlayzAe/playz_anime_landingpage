import { AnimatePresence, motion } from 'motion/react';
import { createContext, useCallback, useContext, useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { asset } from '../lib/router';
import { Icon } from './Icon';
import { Logo } from './Logo';

/** Screenshots of the app in public/screenshots, each as <name>.webp plus an 800px <name>-800.webp. */
export type ShotName =
  | 'home'
  | 'home-top'
  | 'player'
  | 'detail'
  | 'manga'
  | 'manga-rows'
  | 'discover'
  | 'discover-manga'
  | 'schedule'
  | 'downloads'
  | 'profiles'
  | 'settings'
  | 'intro';

const SIZES: Record<ShotName, [number, number]> = {
  home: [1919, 1027],
  'home-top': [1919, 1037],
  player: [1916, 1018],
  detail: [1919, 1029],
  manga: [1919, 1036],
  'manga-rows': [1912, 1035],
  discover: [1919, 1036],
  'discover-manga': [1919, 1030],
  schedule: [1919, 1028],
  downloads: [1919, 948],
  profiles: [1919, 1030],
  settings: [1840, 959],
  intro: [1280, 800],
};

const src = (name: ShotName, small = false) => asset(`screenshots/${name}${small ? '-800' : ''}.webp`);

interface ShotProps {
  name: ShotName;
  alt: string;
  /** Rendered width hint for the browser, e.g. "(max-width: 700px) 92vw, 640px". */
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** A real app screenshot, at two widths so phones fetch the small one. */
export function Shot({ name, alt, sizes = '(max-width: 800px) 94vw, 720px', priority, className, style }: ShotProps) {
  const [w, h] = SIZES[name];
  return (
    <img
      className={className}
      style={style}
      src={src(name)}
      srcSet={`${src(name, true)} 800w, ${src(name)} ${w}w`}
      sizes={sizes}
      alt={alt}
      width={w}
      height={h}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      {...(priority ? { fetchPriority: 'high' as const } : null)}
    />
  );
}

// ── Click to enlarge ────────────────────────────────────────────────────────

export interface ShotItem {
  name: ShotName;
  alt: string;
}

const OpenShot = createContext<(item: ShotItem, group?: ShotItem[]) => void>(() => {});

/**
 * Lets any <ZoomShot> open a larger view. The picture grows out of where it was clicked
 * (a shared-layout animation) into a centred view that leaves the page visible, dimmed,
 * around it. Arrow keys move through the group, Esc or a click closes it.
 */
export function ShotViewerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ group: ShotItem[]; index: number } | null>(null);
  const open = useCallback((item: ShotItem, group: ShotItem[] = [item]) => {
    const index = Math.max(0, group.findIndex((g) => g.name === item.name));
    setState({ group: index >= 0 && group.length ? group : [item], index });
  }, []);
  const close = useCallback(() => setState(null), []);
  const step = useCallback((by: number) => setState((s) => (s ? { ...s, index: (s.index + by + s.group.length) % s.group.length } : s)), []);

  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    // Keep the page from scrolling underneath while the view is open.
    const html = document.documentElement;
    const before = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      html.style.overflow = before;
    };
  }, [state, close, step]);

  const item = state ? state.group[state.index] : null;
  return (
    <OpenShot.Provider value={open}>
      {children}
      <AnimatePresence>
        {item && state && (
          <motion.div
            key="viewer"
            className="viewer"
            role="dialog"
            aria-modal="true"
            aria-label={item.alt}
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.figure
              key={item.name}
              layoutId={`shot-${item.name}`}
              className="viewer-figure"
              onClick={(e) => e.stopPropagation()}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            >
              <img src={src(item.name)} alt={item.alt} width={SIZES[item.name][0]} height={SIZES[item.name][1]} />
            </motion.figure>
            <motion.p className="viewer-caption" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              {item.alt}
              {state.group.length > 1 && (
                <span className="num">
                  {state.index + 1} / {state.group.length}
                </span>
              )}
            </motion.p>
            <button type="button" className="viewer-btn is-close" onClick={close} aria-label="Close">
              <Icon name="close" size={20} />
            </button>
            {state.group.length > 1 && (
              <>
                <button type="button" className="viewer-btn is-prev" onClick={(e) => (e.stopPropagation(), step(-1))} aria-label="Previous screen">
                  <Icon name="arrowLeft" size={20} />
                </button>
                <button type="button" className="viewer-btn is-next" onClick={(e) => (e.stopPropagation(), step(1))} aria-label="Next screen">
                  <Icon name="arrowRight" size={20} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </OpenShot.Provider>
  );
}

/** A screenshot you can click to see bigger. */
export function ZoomShot({ name, alt, group, sizes, priority }: ShotItem & { group?: ShotItem[]; sizes?: string; priority?: boolean }) {
  const open = useContext(OpenShot);
  return (
    <button type="button" className="zoom" onClick={() => open({ name, alt }, group)} aria-label={`${alt}. Show larger`}>
      <motion.span layoutId={`shot-${name}`} className="zoom-shot">
        <Shot name={name} alt={alt} sizes={sizes} priority={priority} />
      </motion.span>
      <span className="zoom-hint" aria-hidden="true">
        <Icon name="fullscreen" size={16} />
      </span>
    </button>
  );
}

interface FrameProps {
  children: ReactNode;
  title?: string;
  className?: string;
  /** "window" draws the Windows title bar; "bare" is just the bezel. */
  variant?: 'window' | 'bare';
  style?: CSSProperties;
}

/** A desktop window bezel around a screenshot. */
export function Frame({ children, title = 'PlayzAnime', className = '', variant = 'window', style }: FrameProps) {
  return (
    <div className={`frame frame-${variant} ${className}`} style={style}>
      {variant === 'window' && (
        <div className="frame-bar" aria-hidden="true">
          <span className="frame-title">
            <Logo size={14} framed={false} title="" />
            {title}
          </span>
          <span className="frame-controls">
            <svg viewBox="0 0 10 10" width="10" height="10">
              <path d="M0 5.5h10" stroke="currentColor" />
            </svg>
            <svg viewBox="0 0 10 10" width="10" height="10">
              <rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="currentColor" />
            </svg>
            <svg viewBox="0 0 10 10" width="10" height="10">
              <path d="M0.5 0.5l9 9M9.5 0.5l-9 9" stroke="currentColor" />
            </svg>
          </span>
        </div>
      )}
      <div className="frame-screen">{children}</div>
    </div>
  );
}
