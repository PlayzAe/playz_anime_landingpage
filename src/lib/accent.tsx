import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export type AccentKey = 'shu' | 'yamabuki' | 'matcha' | 'ai' | 'sakura';

export interface Accent {
  key: AccentKey;
  kanji: string;
  name: string;
  colour: string;
  note: string;
}

/** The same five inks the app offers in Settings → Look. */
export const ACCENTS: Accent[] = [
  { key: 'shu', kanji: '朱', name: 'Shu', colour: '#f0532c', note: 'Vermilion, the colour of seal ink' },
  { key: 'yamabuki', kanji: '山吹', name: 'Yamabuki', colour: '#f3aa36', note: 'The gold of kerria blossom' },
  { key: 'matcha', kanji: '抹茶', name: 'Matcha', colour: '#9dbb5c', note: 'Powdered green tea' },
  { key: 'ai', kanji: '藍', name: 'Ai', colour: '#6f8fe6', note: 'Indigo dye' },
  { key: 'sakura', kanji: '桜', name: 'Sakura', colour: '#ee83a1', note: 'Cherry blossom' },
];

const STORAGE_KEY = 'playzanime-site:accent';

function initialAccent(): AccentKey {
  const fromDom = document.documentElement.getAttribute('data-accent');
  return ACCENTS.find((a) => a.key === fromDom)?.key ?? 'shu';
}

export interface Wash {
  id: number;
  x: number;
  y: number;
  colour: string;
}

interface AccentState {
  accent: AccentKey;
  wash: Wash | null;
  /** `from` is the point the new ink spreads out from (usually the clicked swatch). */
  setAccent: (key: AccentKey, from?: { x: number; y: number }) => void;
}

const AccentContext = createContext<AccentState | null>(null);

export function AccentProvider({ children }: { children: ReactNode }) {
  const [accent, setState] = useState<AccentKey>(initialAccent);
  const [wash, setWash] = useState<Wash | null>(null);

  const setAccent = useCallback((key: AccentKey, from?: { x: number; y: number }) => {
    setState(key);
    document.documentElement.setAttribute('data-accent', key);
    const colour = ACCENTS.find((a) => a.key === key)?.colour ?? '#f0532c';
    if (from) setWash((w) => ({ id: (w?.id ?? 0) + 1, x: from.x, y: from.y, colour }));
    try {
      localStorage.setItem(STORAGE_KEY, key);
    } catch {
      /* private mode: the choice lasts for this visit only */
    }
  }, []);

  const value = useMemo(() => ({ accent, wash, setAccent }), [accent, wash, setAccent]);
  return <AccentContext.Provider value={value}>{children}</AccentContext.Provider>;
}

export function useAccent(): AccentState {
  const ctx = useContext(AccentContext);
  if (!ctx) throw new Error('useAccent outside AccentProvider');
  return ctx;
}
