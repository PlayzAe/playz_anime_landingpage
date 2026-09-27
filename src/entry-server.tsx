import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { AccentProvider } from './lib/accent';
import { RouterProvider } from './lib/router';

// Used only at build time by scripts/prerender.mjs, which writes one HTML file per page.
export { headFor, routes, sitemapEntries } from './seo';

export function render(path: string): string {
  return renderToString(
    <StrictMode>
      <AccentProvider>
        <RouterProvider initialPath={path}>
          <App />
        </RouterProvider>
      </AccentProvider>
    </StrictMode>,
  );
}
