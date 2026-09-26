import { InkWash } from './components/AccentSwitcher';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { Docs } from './docs/Docs';
import { Landing } from './landing/Landing';
import { useRouter } from './lib/router';

export function App() {
  const { path } = useRouter();
  const docs = path === '/docs' || path.startsWith('/docs/');
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <InkWash />
      <main id="main">{docs ? <Docs /> : <Landing />}</main>
      <SiteFooter />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
