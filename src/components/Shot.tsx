import type { CSSProperties, ReactNode } from 'react';
import { asset } from '../lib/router';
import { Logo } from './Logo';

export type ShotName = 'home' | 'manga' | 'downloads' | 'profiles' | 'friend' | 'settings' | 'setup' | 'intro';

const SIZES: Record<ShotName, [number, number]> = {
  home: [1440, 900],
  manga: [1440, 900],
  downloads: [1440, 900],
  profiles: [1440, 900],
  friend: [1440, 900],
  settings: [1440, 900],
  setup: [1280, 800],
  intro: [1280, 800],
};

interface ShotProps {
  name: ShotName;
  alt: string;
  /** Rendered width hint for the browser, e.g. "(max-width: 700px) 92vw, 640px". */
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** A real app screenshot: WebP at two widths, with the original PNG as the fallback. */
export function Shot({ name, alt, sizes = '(max-width: 800px) 94vw, 720px', priority, className, style }: ShotProps) {
  const [w, h] = SIZES[name];
  return (
    <picture className={className} style={style}>
      <source type="image/webp" srcSet={`${asset(`screenshots/${name}-800.webp`)} 800w, ${asset(`screenshots/${name}.webp`)} ${w}w`} sizes={sizes} />
      <img
        src={asset(`screenshots/${name}.png`)}
        alt={alt}
        width={w}
        height={h}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchPriority: 'high' as const } : null)}
      />
    </picture>
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
