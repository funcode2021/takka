import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './i18n/index.ts'
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Routes are prerendered at build time (scripts/prerender.mjs); hydrate those,
// fall back to a fresh render for the SPA fallback page.
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app)
} else {
  createRoot(rootElement).render(app)
}
