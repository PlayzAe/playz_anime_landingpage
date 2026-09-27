import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Icon, type IconName } from '../components/Icon';
import { Logo } from '../components/Logo';
import { Frame, ShotViewerProvider, ZoomShot, type ShotItem, type ShotName } from '../components/Shot';
import { formatSize, releasePath, useLiveReleases, type Release } from '../docs/changelog';
import { DOWNLOAD_URL, GITHUB_URL, WEB_APP_URL } from '../lib/links';
import { Link } from '../lib/router';
import { EASE, Reveal, Vertical } from './bits';
import { FAQ, faqParts } from './faq';
import { posterColumns, posterUrl } from './posters';
import './landing.css';

/** Every screen on the page, in order: the larger view steps through them with the arrow keys. */
const TOUR: ShotItem[] = [
  { name: 'home', alt: 'Home: continue watching, with the show you were on up front' },
  { name: 'player', alt: 'The player, with Skip intro and the episode list' },
  { name: 'manga', alt: 'Manga home: trending manhwa and continue reading' },
  { name: 'downloads', alt: 'Downloads, grouped by series, playable offline' },
  { name: 'profiles', alt: 'Your profile, and the ones friends shared with you' },
  { name: 'settings', alt: 'Settings, with the five accent colours' },
  { name: 'detail', alt: 'A series page: episodes, related shows and the details' },
  { name: 'discover', alt: 'Discover: everything on AniList, filtered your way' },
  { name: 'manga-rows', alt: 'Trending manga and Korean manhwa' },
  { name: 'schedule', alt: 'The week’s schedule, in your time zone' },
  { name: 'home-top', alt: 'The top 10 this week and the season’s most popular shows' },
  { name: 'discover-manga', alt: 'Discover for manga, manhwa and manhua' },
];
const altOf = (name: ShotName) => TOUR.find((t) => t.name === name)?.alt ?? '';

export function Landing() {
  useEffect(() => {
    document.title = 'PlayzAnime: free anime & manga app for Windows, open source';
  }, []);
  return (
    <ShotViewerProvider>
      <Hero />
      <Showcase />
      <section id="features" className="features page" aria-label="Features">
        <Feature
          eyebrow="Watch"
          title="Its own player. No ads, ever."
          body="Episodes play in PlayzAnime's player, not a page full of pop-ups. Skip the intro, pick subtitles in any script, and keep your hands on the keyboard. It remembers where you stopped and whether you like the dub."
          points={['Skip intro and up next', 'Subtitles for every script', 'Keyboard shortcuts', 'Sub or dub, remembered per show']}
          shot="player"
          kana="再生"
        />
        <Feature
          flip
          eyebrow="Read"
          title="Manga, manhwa and manhua. Sixty sources, picked for you."
          body="PlayzAnime checks MangaDex, Asura Scans, WeebCentral, Flame Comics, MangaPill and 55 community sources at once, and reads from whichever is furthest along, skipping any that are down. Manga opens right to left; webtoons open as one long strip."
          points={['Automatic source pick with health checks', 'Paged and scrolling reader', '"Read from another source" when one fails', 'Progress saved to the page']}
          shot="manga"
          kana="読む"
        />
        <Feature
          eyebrow="Keep"
          title="Downloads that finish, even when your connection doesn't."
          body="Episodes save as MP4 with subtitles inside; chapters save as CBZ. A download picks up where it stopped, waits out busy hosts, and files itself neatly: PlayzAnime\Show\Season 2\Show_E05_720p.mp4."
          points={['Resumes where it stopped', 'Grouped by show, episode and quality', 'Plays and reads offline, inside the app', 'Your folders, your choice']}
          shot="downloads"
          kana="保存"
          tag="Windows app"
        />
        <Feature
          flip
          eyebrow="Share"
          title="A profile you can hand to a friend."
          body="Pick a name, a picture and your favourites. Share your profile as a small .playzanime file; your friend drops it onto their app and sees what you've watched and read, in its own tab. Nothing leaves your device unless you send it."
          points={['No accounts, no sign-up', 'Drag, drop, done', 'Add their picks to your list in one click']}
          shot="profiles"
          kana="友達"
        />
        <Feature
          eyebrow="Yours"
          title="Five inks. One app that feels like yours."
          body="Choose an accent named after a traditional Japanese colour: shu vermilion, yamabuki gold, matcha, ai indigo or sakura. The whole app, from the play button to the opening stamp, takes it on. Try the swatches at the top of this page."
          points={['Accent colours with a story', 'Data saver for slow connections', 'Original titles set vertically']}
          shot="settings"
          kana="朱色"
        />
      </section>
      <Gallery />
      <Extras />
      <Platforms />
      <Faq />
      <Closing />
    </ShotViewerProvider>
  );
}

// ── Hero ────────────────────────────────────────────────────────────────────

const WALL_COLUMNS = 12;
const WALL_SPEEDS = [66, 84, 58, 92, 72, 78, 62, 88, 70, 80, 60, 86];

/**
 * A wall of covers drifting behind the hero, tilted back and faded into the page, edge to
 * edge on any screen: wide screens show more columns, phones fewer (hidden columns never
 * download their covers). The motion is CSS transforms only, run by the compositor, it
 * stops while the wall is off screen, and reduced-motion users get a still wall.
 */
function PosterWall() {
  const ref = useRef<HTMLDivElement>(null);

  // The wall only moves while it's on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => el.toggleAttribute('data-still', !entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="wall" aria-hidden="true">
      <div className="wall-plane">
        {posterColumns(WALL_COLUMNS).map((col, c) => (
          <div
            key={c}
            className={`wall-col${c % 2 ? ' is-down' : ''}`}
            style={{ '--speed': `${WALL_SPEEDS[c]}s`, '--start': `${-((c * 0.17) % 1)}` } as CSSProperties}
          >
            <div className="wall-track">
              {[...col, ...col].map((p, i) => (
                <span key={i} className="wall-tile" style={{ backgroundColor: p[2] }}>
                  <img src={posterUrl(p)} alt="" width={230} height={326} loading="lazy" decoding="async" fetchPriority="low" />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="wall-fade" />
    </div>
  );
}

/** The newest release's Windows installer, when the release has one attached. */
const installerOf = (release: Release | undefined) => release?.assets.find((a) => /setup.*\.exe$/i.test(a.name));

function Hero() {
  const reduced = useReducedMotion();
  const { releases } = useLiveReleases();
  const latest = releases[0];
  const installer = installerOf(latest);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <PosterWall />
      <div className="hero-glow" aria-hidden="true" />
      <Vertical className="hero-kana">アニメとマンガ</Vertical>
      <div className="hero-inner page">
        {latest && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6, ease: EASE }}>
            <Link to={releasePath(latest)} className="hero-news">
              <span className="hero-news-tag">New</span>
              What’s new in {latest.tag}
              <Icon name="arrowRight" size={14} />
            </Link>
          </motion.div>
        )}
        <div className="hero-seal">
          {!reduced && (
            <motion.span className="hero-ring" initial={{ scale: 0.4, opacity: 0.9 }} animate={{ scale: 2.4, opacity: 0 }} transition={{ delay: 0.45, duration: 1.1, ease: 'easeOut' }} />
          )}
          <motion.span
            initial={reduced ? { opacity: 0 } : { scale: 2.6, rotate: -14, opacity: 0, filter: 'blur(6px)' }}
            animate={{ scale: 1, rotate: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={reduced ? { duration: 0.3 } : { type: 'spring', stiffness: 480, damping: 20, mass: 1.1, delay: 0.1 }}
          >
            <Logo size={84} title="PlayzAnime" />
          </motion.span>
        </div>
        <motion.p className="hero-eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.6, ease: EASE }}>
          Free · No ads · Open source
        </motion.p>
        <h1 id="hero-title" className="hero-title display">
          {['Anime and manga,', 'stamped into one app.'].map((line, i) => (
            <motion.span
              key={line}
              className={`hero-line${i === 1 ? ' is-accent' : ''}`}
              initial={{ opacity: 0, y: '0.4em', filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.65 + i * 0.12, duration: 0.8, ease: EASE }}
            >
              {line}
            </motion.span>
          ))}
        </h1>
        <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.7 }}>
          Watch and download anime. Read and download manga, manhwa and manhua. Offline when you need it, beautiful when you don't.
        </motion.p>
        <motion.div className="hero-ctas" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15, duration: 0.6, ease: EASE }}>
          {/* Straight to the installer when the build knows it; the releases page otherwise. */}
          <a className="button is-primary is-shine" href={installer?.url ?? DOWNLOAD_URL} rel="noopener noreferrer">
            <Icon name="windows" size={18} />
            Download for Windows
          </a>
          <a className="button is-glass" href={WEB_APP_URL} target="_blank" rel="noopener noreferrer">
            <Icon name="globe" size={18} />
            Open the web app
          </a>
        </motion.div>
        <motion.div className="hero-meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.35, duration: 0.8 }}>
          <p className="hero-facts">
            {latest && <span className="num">{latest.tag}</span>}
            {installer && <span className="num">{formatSize(installer.size)}</span>}
            <span>Windows 10 and 11</span>
          </p>
          <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
            Portable and older versions
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/** The app itself, tilted back like a screen on a desk, standing up as you scroll to it. */
function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [reduced ? 1 : 0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 60, 0]);
  return (
    <section className="showcase page" aria-label="The PlayzAnime app">
      <div ref={ref} className="showcase-stage">
        <motion.div style={{ rotateX, scale, y }} className="showcase-tilt">
          <Frame className="showcase-frame" variant="bare">
            <ZoomShot name="home" alt={altOf('home')} group={TOUR} priority sizes="(max-width: 1000px) 96vw, 1100px" />
          </Frame>
        </motion.div>
        <div className="showcase-shadow" aria-hidden="true" />
      </div>
    </section>
  );
}

// ── Features ────────────────────────────────────────────────────────────────

interface FeatureProps {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  shot: ShotName;
  kana: string;
  flip?: boolean;
  tag?: string;
}

function Feature({ eyebrow, title, body, points, shot, kana, flip, tag }: FeatureProps) {
  return (
    <article className={`feature${flip ? ' is-flipped' : ''}`}>
      <Reveal className="feature-copy">
        <p className="feature-eyebrow">
          {eyebrow}
          {tag && <span className="feature-tag">{tag}</span>}
        </p>
        <h2 className="feature-title display">{title}</h2>
        <p className="feature-body">{body}</p>
        <ul className="feature-points">
          {points.map((p) => (
            <li key={p}>
              <Icon name="check" size={16} />
              {p}
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal className="feature-shot" delay={0.1} y={40}>
        <Vertical className="feature-kana">{kana}</Vertical>
        <Frame variant="bare">
          <ZoomShot name={shot} alt={altOf(shot)} group={TOUR} />
        </Frame>
      </Reveal>
    </article>
  );
}

// ── Gallery ─────────────────────────────────────────────────────────────────

const GALLERY: { name: ShotName; caption: string }[] = [
  { name: 'detail', caption: 'Every series has a page: episodes, related shows, the details.' },
  { name: 'discover', caption: 'Discover everything on AniList, filtered your way.' },
  { name: 'manga-rows', caption: 'Trending manga and manhwa, one click from reading.' },
  { name: 'schedule', caption: 'This week’s schedule, in your time zone.' },
  { name: 'home-top', caption: 'The top 10 this week and the season’s biggest shows.' },
  { name: 'discover-manga', caption: 'Manga, manhwa and manhua in one place.' },
];

function Gallery() {
  return (
    <section className="gallery page" aria-labelledby="gallery-title">
      <Reveal className="gallery-head">
        <h2 id="gallery-title" className="section-title display">
          Take a look around
        </h2>
        <p>Click any screen to see it bigger.</p>
      </Reveal>
      <div className="gallery-grid">
        {GALLERY.map((g, i) => (
          <Reveal key={g.name} className="gallery-item" delay={0.06 * (i % 3)}>
            <Frame variant="bare">
              <ZoomShot name={g.name} alt={altOf(g.name)} group={TOUR} sizes="(max-width: 700px) 84vw, (max-width: 1100px) 46vw, 400px" />
            </Frame>
            <p>{g.caption}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── Extras and platforms ────────────────────────────────────────────────────

const EXTRAS: { icon: IconName; title: string; body: string }[] = [
  { icon: 'shield', title: 'No ads, no trackers', body: 'No pop-ups, no analytics, no cookies. Not now, not later.' },
  { icon: 'keyboard', title: 'Keyboard first', body: 'Space, J, L, N, F and more. The reader turns pages with arrows.' },
  { icon: 'offline', title: 'Offline mode', body: 'No internet? The Windows app opens on your downloads and plays them.' },
  { icon: 'bolt', title: 'Data saver', body: 'Small buffers, capped quality and compressed pages for hotspots.' },
  { icon: 'profiles', title: 'Profiles, not accounts', body: 'Your lists stay on your device. Share them as a file if you like.' },
  { icon: 'github', title: 'Open source', body: 'Read the code, build it yourself, suggest a change.' },
];

function Extras() {
  return (
    <section className="extras page" aria-labelledby="extras-title">
      <Reveal>
        <h2 id="extras-title" className="section-title display">
          Also in the box
        </h2>
      </Reveal>
      <div className="extras-grid">
        {EXTRAS.map((x, i) => (
          <Reveal key={x.title} className="extra" delay={0.05 * i}>
            <span className="extra-icon">
              <Icon name={x.icon} size={20} />
            </span>
            <h3>{x.title}</h3>
            <p>{x.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Platforms() {
  return (
    <section className="platforms page" aria-labelledby="platforms-title">
      <Reveal>
        <h2 id="platforms-title" className="section-title display">
          Two ways in
        </h2>
      </Reveal>
      <div className="platform-cards">
        <PlatformCard
          icon="windows"
          name="Windows app"
          lede="The full PlayzAnime: installer or a single portable exe."
          items={['Everything on the web, plus:', 'Downloads as MP4 and CBZ', 'Offline mode', 'Taskbar and media-key controls']}
          cta={
            <a className="button is-primary" href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
              <Icon name="windows" size={18} /> Download for Windows
            </a>
          }
        />
        <PlatformCard
          icon="globe"
          name="Web app"
          lede="Nothing to install. Works on your phone too."
          items={['Watch and read in the browser', 'The same player and reader', 'Profiles and lists saved in the browser', 'Phone-sized layout']}
          cta={
            <a className="button" href={WEB_APP_URL} target="_blank" rel="noopener noreferrer">
              <Icon name="globe" size={18} /> Open the web app
            </a>
          }
        />
      </div>
    </section>
  );
}

function PlatformCard({ icon, name, lede, items, cta }: { icon: IconName; name: string; lede: string; items: string[]; cta: ReactNode }) {
  return (
    <Reveal className="platform-card">
      <span className="platform-icon">
        <Icon name={icon} size={24} />
      </span>
      <h3>{name}</h3>
      <p className="platform-lede">{lede}</p>
      <ul>
        {items.map((it, i) => (
          <li key={it} className={i === 0 && it.endsWith(':') ? 'is-lead' : undefined}>
            {!(i === 0 && it.endsWith(':')) && <Icon name="check" size={15} />}
            {it}
          </li>
        ))}
      </ul>
      <div className="platform-cta">{cta}</div>
    </Reveal>
  );
}

// ── Questions ───────────────────────────────────────────────────────────────

/**
 * One answer open at a time. Answers stay in the page (search engines read them) and open by
 * growing their height, then fading the words in.
 */
function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();
  return (
    <section id="faq" className="faq page" aria-labelledby="faq-title">
      <Reveal>
        <h2 id="faq-title" className="section-title display">
          Questions
        </h2>
      </Reveal>
      <div className="faq-list">
        {FAQ.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className={`faq-item${isOpen ? ' is-open' : ''}`}>
              <h3>
                <button type="button" id={`${id}-q${i}`} aria-expanded={isOpen} aria-controls={`${id}-a${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                  {f.q}
                  <span className="faq-icon" aria-hidden="true" />
                </button>
              </h3>
              <div id={`${id}-a${i}`} role="region" aria-labelledby={`${id}-q${i}`} className="faq-panel" inert={!isOpen}>
                <div className="faq-panel-inner">
                  <p className="faq-answer">
                    {faqParts(f.a).map((p, j) =>
                      typeof p === 'string' ? (
                        p
                      ) : (
                        <Link key={j} to={p.to}>
                          {p.text}
                        </Link>
                      ),
                    )}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── Closing ─────────────────────────────────────────────────────────────────

function Closing() {
  const { releases } = useLiveReleases();
  const installer = installerOf(releases[0]);
  return (
    <section className="closing" aria-labelledby="closing-title">
      <PosterWall />
      <div className="closing-glow" aria-hidden="true" />
      <Reveal className="closing-inner page">
        <Logo size={56} title="" />
        <h2 id="closing-title" className="closing-title display">
          Press play.
        </h2>
        <p>Free, ad-free, and yours in a minute.</p>
        <div className="hero-ctas">
          <a className="button is-primary is-shine" href={installer?.url ?? DOWNLOAD_URL} rel="noopener noreferrer">
            <Icon name="windows" size={18} /> Download for Windows
          </a>
          <a className="button is-glass" href={WEB_APP_URL} target="_blank" rel="noopener noreferrer">
            <Icon name="globe" size={18} /> Open the web app
          </a>
          <a className="button is-quiet" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            <Icon name="github" size={18} /> GitHub
          </a>
        </div>
      </Reveal>
    </section>
  );
}
