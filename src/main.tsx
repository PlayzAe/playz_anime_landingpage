import '@fontsource-variable/archivo/standard.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/site.css';
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import { AccentProvider } from './lib/accent';
import { RouterProvider } from './lib/router';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <AccentProvider>
      <RouterProvider>
        <App />
      </RouterProvider>
    </AccentProvider>
  </StrictMode>
);

// Built pages arrive already rendered (scripts/prerender.mjs); the dev server and 404.html don't.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
