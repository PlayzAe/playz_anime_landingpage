import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useEffect, useState } from 'react';
import { GITHUB_URL } from '../lib/links';
import { Link, useRouter } from '../lib/router';
import { AccentPicker, AccentSwatches } from './AccentSwitcher';
import { Icon } from './Icon';
import { Logo } from './Logo';

const NAV = [
  { to: '/#features', label: 'Features' },
  { to: '/#faq', label: 'FAQ' },
  { to: '/docs', label: 'Docs' },
];

export function SiteHeader() {
  const { path } = useRouter();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 8));
  useEffect(() => setMenu(false), [path]);
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menu]);

  const isActive = (to: string) => (to === '/docs' ? path.startsWith('/docs') : false);

  return (
    <header className={`site-header${scrolled || path !== '/' ? ' is-solid' : ''}`}>
      <div className="site-header-inner">
        <Link to="/" className="brand" aria-label="PlayzAnime home">
          <Logo size={30} title="" />
          <span className="brand-name">PlayzAnime</span>
        </Link>

        <nav className="site-nav" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className={`site-nav-link${isActive(n.to) ? ' is-active' : ''}`} aria-current={isActive(n.to) ? 'page' : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="site-tools">
          <AccentSwatches className="only-wide" />
          <AccentPicker className="only-narrow" />
          <a className="icon-link only-wide" href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="PlayzAnime on GitHub">
            <Icon name="github" size={20} />
          </a>
          <button type="button" className="menu-button only-narrow" aria-expanded={menu} aria-controls="site-menu" onClick={() => setMenu((m) => !m)}>
            <Icon name={menu ? 'close' : 'menu'} size={20} />
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.nav
            id="site-menu"
            className="site-menu"
            aria-label="Menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {NAV.map((n, i) => (
              <motion.div key={n.to} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i + 0.05 }}>
                <Link to={n.to} className="site-menu-link" onClick={() => setMenu(false)}>
                  {n.label}
                  <Icon name="chevronRight" size={18} />
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.17 }}>
              <a className="site-menu-link" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                GitHub
                <Icon name="github" size={18} />
              </a>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
