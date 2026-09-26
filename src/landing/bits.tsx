import { motion } from 'motion/react';
import type { CSSProperties, ReactNode } from 'react';
import { asset } from '../lib/router';
import type { ShotName } from '../components/Shot';

export const EASE = [0.16, 1, 0.3, 1] as const;

/** Fades and lifts its children in the first time they scroll into view. */
export function Reveal({ children, delay = 0, y = 28, className, amount = 0.25 }: { children: ReactNode; delay?: number; y?: number; className?: string; amount?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** A Japanese word set vertically in the margin, the way the app sets original titles. */
export function Vertical({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`v-accent jp ${className}`} aria-hidden="true">
      {children}
    </span>
  );
}

const DIMENSIONS: Record<ShotName, [number, number]> = {
  home: [1440, 900],
  manga: [1440, 900],
  downloads: [1440, 900],
  profiles: [1440, 900],
  friend: [1440, 900],
  settings: [1440, 900],
  setup: [1280, 800],
  intro: [1280, 800],
};

/**
 * Shows one rectangle of a screenshot, given in the screenshot's own pixels.
 * The container takes the rectangle's aspect ratio; the image is positioned inside.
 */
export function Crop({ name, x, y, w, h, alt = '', className = '', style }: { name: ShotName; x: number; y: number; w: number; h: number; alt?: string; className?: string; style?: CSSProperties }) {
  const [W, H] = DIMENSIONS[name];
  return (
    <span className={`crop ${className}`} style={{ aspectRatio: `${w} / ${h}`, ...style }}>
      <picture>
        <source type="image/webp" srcSet={`${asset(`screenshots/${name}-800.webp`)} 800w, ${asset(`screenshots/${name}.webp`)} ${W}w`} sizes={`${Math.round((W / w) * 40)}vw`} />
        <img
          src={asset(`screenshots/${name}.png`)}
          alt={alt}
          width={W}
          height={H}
          loading="lazy"
          decoding="async"
          style={{ width: `${(W / w) * 100}%`, left: `${(-x / w) * 100}%`, top: `${(-y / h) * 100}%` }}
        />
      </picture>
    </span>
  );
}
