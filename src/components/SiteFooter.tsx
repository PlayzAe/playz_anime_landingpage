import { DOWNLOAD_URL, GITHUB_URL, WEB_APP_URL } from '../lib/links';
import { Link } from '../lib/router';
import { Icon } from './Icon';
import { Logo } from './Logo';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="page">
        <aside className="disclaimer" aria-label="Disclaimer">
          <Icon name="info" size={20} />
          <p>
            <strong>PlayzAnime doesn't host, upload or distribute any media.</strong> It shows content that third-party sites already make public, and
            metadata comes from AniList. You're responsible for how you use it and for following the laws where you live.
          </p>
        </aside>

        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand" aria-label="PlayzAnime home">
              <Logo size={34} title="" />
              <span className="brand-name">PlayzAnime</span>
            </Link>
            <p>Watch and download anime. Read and download manga, manhwa and manhua. Free, with no ads.</p>
            <a className="footer-github" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <Icon name="github" size={20} />
              <span>PlayzAe on GitHub</span>
            </a>
          </div>

          <nav className="footer-col" aria-label="Get PlayzAnime">
            <h2>Get it</h2>
            <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
              Download for Windows
            </a>
            <a href={WEB_APP_URL} target="_blank" rel="noopener noreferrer">
              Open the web app
            </a>
            <Link to="/#features">Features</Link>
          </nav>

          <nav className="footer-col" aria-label="Help">
            <h2>Help</h2>
            <Link to="/docs">Docs</Link>
            <Link to="/#faq">FAQ</Link>
            <Link to="/docs/policies">Policies</Link>
          </nav>

          <p className="footer-vertical jp" aria-hidden="true">
            アニメ・マンガ
          </p>
        </div>

        <div className="footer-base">
          <span>© {year} PlayzAnime</span>
          <span>No ads, no trackers, no cookies on this site.</span>
        </div>
      </div>
    </footer>
  );
}
