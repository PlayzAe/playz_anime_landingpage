import '@fontsource-variable/archivo/standard.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/site.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { AccentProvider } from './lib/accent';
import { RouterProvider } from './lib/router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AccentProvider>
      <RouterProvider>
        <App />
      </RouterProvider>
    </AccentProvider>
  </StrictMode>,
);
