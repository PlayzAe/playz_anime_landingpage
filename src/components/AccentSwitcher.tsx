import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { ACCENTS, useAccent, type AccentKey } from '../lib/accent';

function originOf(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

/** Five ink swatches in a row. Used in the header on wide screens. */
export function AccentSwatches({ className = '' }: { className?: string }) {
  const { accent, setAccent } = useAccent();
  return (
    <div className={`swatches ${className}`} role="radiogroup" aria-label="Accent colour">
      {ACCENTS.map((a) => {
        const on = a.key === accent;
        return (
          <button
            key={a.key}
            type="button"
            role="radio"
            aria-checked={on}
            className={`swatch${on ? ' is-on' : ''}`}
            style={{ ['--sw' as string]: a.colour }}
            title={`${a.name} ${a.kanji}`}
            onClick={(e) => setAccent(a.key, originOf(e))}
          >
            <span className="sr-only">{a.name}</span>
            {on && <span key={accent} className="swatch-ring" aria-hidden="true" />}
          </button>
        );
      })}
    </div>
  );
}

/** One chip that opens the five swatches. Used on phones. */
export function AccentPicker({ className = '' }: { className?: string }) {
  const { accent, setAccent } = useAccent();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = ACCENTS.find((a) => a.key === accent)!;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const pick = (key: AccentKey, e: MouseEvent<HTMLElement>) => {
    setAccent(key, originOf(e));
    setOpen(false);
  };

  return (
    <div className={`picker ${className}`} ref={ref}>
      <button type="button" className="picker-chip" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((o) => !o)}>
        <span className="picker-dot" aria-hidden="true" />
        <span className="jp" aria-hidden="true">
          {current.kanji}
        </span>
        <span className="sr-only">Accent colour: {current.name}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="picker-tray"
            role="radiogroup"
            aria-label="Accent colour"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 520, damping: 34 }}
          >
            {ACCENTS.map((a) => (
              <button
                key={a.key}
                type="button"
                role="radio"
                aria-checked={a.key === accent}
                className={`picker-option${a.key === accent ? ' is-on' : ''}`}
                style={{ ['--sw' as string]: a.colour }}
                onClick={(e) => pick(a.key, e)}
              >
                <span className="picker-swatch" aria-hidden="true" />
                <span className="jp" aria-hidden="true">
                  {a.kanji}
                </span>
                <span>{a.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** A soft wash of the new ink spreading from where it was picked. */
export function InkWash() {
  const { wash } = useAccent();
  return (
    <div className="wash-layer" aria-hidden="true">
      <AnimatePresence>
        {wash && (
          <motion.span
            key={wash.id}
            className="wash"
            style={{ left: wash.x, top: wash.y, background: `radial-gradient(circle, ${wash.colour} 0%, transparent 62%)` }}
            initial={{ scale: 0, opacity: 0.32 }}
            animate={{ scale: 1, opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
