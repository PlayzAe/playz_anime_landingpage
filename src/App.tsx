import { InkWash } from './components/AccentSwitcher';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { isDocsPath } from './docs/content';
import { Docs } from './docs/Docs';
import { Landing } from './landing/Landing';
import { useRouter } from './lib/router';

export function App() {
  const { path } = useRouter();
  // The docs are a site of their own, with their own header and footer.
  if (isDocsPath(path)) {
    return (
      <>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Docs />
        <InkWash />
      </>
    );
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <InkWash />
      <main id="main">
        <Landing />
      </main>
      <SiteFooter />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
