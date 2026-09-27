import { motion } from 'motion/react';
import type { ReactNode } from 'react';

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
