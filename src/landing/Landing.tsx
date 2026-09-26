import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, type ReactNode } from 'react';
import { Icon, type IconName } from '../components/Icon';
import { Logo } from '../components/Logo';
import { Frame, Shot, type ShotName } from '../components/Shot';
import { DOWNLOAD_URL, GITHUB_URL, WEB_APP_URL } from '../lib/links';
import { Link } from '../lib/router';
import { EASE, Reveal, Vertical } from './bits';
import './landing.css';

export function Landing() {
  useEffect(() => {
    document.title = 'PlayzAnime: watch anime, read manga, keep both';
  }, []);
  return (
    <>
      <Hero />
      <Showcase />
      <section id="features" className="features page" aria-label="Features">
        <Feature
          eyebrow="Watch"
          title="Its own player. No ads, ever."
          body="Episodes play in PlayzAnime's player, not a page full of pop-ups. Skip the intro, pick subtitles in any script, and keep your hands on the keyboard. It remembers where you stopped and whether you like the dub."
          points={['Skip intro and up next', 'Subtitles for every script', 'Keyboard shortcuts', 'Sub or dub, remembered per show']}
          shot="home"
          alt="PlayzAnime's home screen with the continue-watching shelf"
          kana="再生"
        />
        <Feature
          flip
          eyebrow="Read"
          title="Manga, manhwa and manhua. Four sources, picked for you."
          body="PlayzAnime checks MangaDex, WeebCentral, Flame Comics and MangaPill at once and reads from whichever is furthest along, skipping any that are down. Manga opens right to left; webtoons open as one long strip."
          points={['Automatic source pick with health checks', 'Paged and scrolling reader', '"Read from another source" when one fails', 'Progress saved to the page']}
          shot="manga"
          alt="The manga home screen with trending manhwa"
          kana="読む"
        />
        <Feature
          eyebrow="Keep"
          title="Downloads that finish, even when your connection doesn't."
          body="Episodes save as MP4 with subtitles inside; chapters save as CBZ. A download picks up where it stopped, waits out busy hosts, and files itself neatly: PlayzAnime\Show\Season 2\Show_E05_720p.mp4."
          points={['Resumes where it stopped', 'Grouped by show, episode and quality', 'Plays and reads offline, inside the app', 'Your folders, your choice']}
          shot="downloads"
          alt="The downloads page grouped by series, episode and quality"
          kana="保存"
          tag="Windows app"
        />
        <Feature
          flip
          eyebrow="Share"
          title="A profile you can hand to a friend."
          body="Pick a name, a picture and your favourites. Share your profile as a small .playzanime file; your friend drops it onto their app and sees what you've watched and read, in its own tab. Nothing leaves your device unless you send it."
          points={['No accounts, no sign-up', 'Drag, drop, done', 'Add their picks to your list in one click']}
          shot="friend"
          alt="A friend's shared profile with their favourites"
          kana="友達"
        />
        <Feature
          eyebrow="Yours"
          title="Five inks. One app that feels like yours."
          body="Choose an accent named after a traditional Japanese colour: shu vermilion, yamabuki gold, matcha, ai indigo or sakura. The whole app, from the play button to the opening stamp, takes it on. Try the swatches at the top of this page."
          points={['Accent colours with a story', 'Data saver for slow connections', 'Original titles set vertically']}
          shot="settings"
          alt="The settings page with the five accent colours"
          kana="朱色"
        />
      </section>
      <Extras />
      <Platforms />
      <Faq />
      <Closing />
    </>
  );
}

// ── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  const reduced = useReducedMotion();
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />
      <Vertical className="hero-kana">アニメとマンガ</Vertical>
      <div className="hero-inner page">
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
          <a className="button is-primary" href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
            <Icon name="windows" size={18} />
            Download for Windows
          </a>
          <a className="button" href={WEB_APP_URL} target="_blank" rel="noopener noreferrer">
            <Icon name="globe" size={18} />
            Open the web app
          </a>
        </motion.div>
        <motion.div className="platforms-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.35, duration: 0.8 }}>
          <span className="platforms-label">Available on</span>
          <span className="platform">
            <Icon name="windows" size={18} /> Windows
          </span>
          <span className="platform">
            <Icon name="globe" size={18} /> Web
          </span>
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
          <Frame className="showcase-frame">
            <Shot name="home" alt="PlayzAnime's home screen: continue watching, trending anime and this season" priority sizes="(max-width: 1000px) 96vw, 1100px" />
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
  alt: string;
  kana: string;
  flip?: boolean;
  tag?: string;
}

function Feature({ eyebrow, title, body, points, shot, alt, kana, flip, tag }: FeatureProps) {
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
          <Shot name={shot} alt={alt} />
        </Frame>
      </Reveal>
    </article>
  );
}

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

const FAQ: { q: string; a: ReactNode }[] = [
  { q: 'Is PlayzAnime free?', a: 'Yes. No ads, no subscription, no premium tier. It is open source.' },
  {
    q: 'Does PlayzAnime host anime or manga?',
    a: (
      <>
        No. It shows content that third-party websites already publish, and metadata comes from AniList. PlayzAnime doesn't host, upload or sell any of it. See the{' '}
        <Link to="/docs/policies/disclaimer">disclaimer</Link>.
      </>
    ),
  },
  { q: 'Do I need an account?', a: 'No. There are no accounts. Your lists, history and profile stay on your device or in your browser.' },
  { q: 'Can I download episodes on the web?', a: 'Downloads and offline mode are in the Windows app. The web app streams and reads, and shows you where to get the app when you want to keep something.' },
  {
    q: 'Windows says "Windows protected your PC". Is it safe?',
    a: 'That warning appears for apps without a paid code-signing certificate. Click More info, then Run anyway. The source code is public if you want to check it or build it yourself.',
  },
  {
    q: 'A title has no chapters or won’t play. What now?',
    a: (
      <>
        Sources come and go. Try another source from the chapter list, or the embed player for episodes. The <Link to="/docs">docs</Link> have a troubleshooting section.
      </>
    ),
  },
  {
    q: 'I own content that appears in PlayzAnime.',
    a: (
      <>
        Send a notice as described in <Link to="/docs/policies/copyright-and-dmca">Copyright & DMCA</Link>. We act on valid notices within 72 hours.
      </>
    ),
  },
];

function Faq() {
  return (
    <section id="faq" className="faq page" aria-labelledby="faq-title">
      <Reveal>
        <h2 id="faq-title" className="section-title display">
          Questions
        </h2>
      </Reveal>
      <div className="faq-list">
        {FAQ.map((f) => (
          <details key={f.q} className="faq-item">
            <summary>
              {f.q}
              <Icon name="plus" size={18} />
            </summary>
            <div className="faq-answer">{f.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="closing-glow" aria-hidden="true" />
      <Reveal className="closing-inner page">
        <Logo size={56} title="" />
        <h2 id="closing-title" className="closing-title display">
          Press play.
        </h2>
        <p>Free, ad-free, and yours in a minute.</p>
        <div className="hero-ctas">
          <a className="button is-primary" href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
            <Icon name="windows" size={18} /> Download for Windows
          </a>
          <Link to="/docs" className="button">
            Read the docs
          </Link>
          <a className="button is-quiet" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            <Icon name="github" size={18} /> GitHub
          </a>
        </div>
      </Reveal>
    </section>
  );
}
