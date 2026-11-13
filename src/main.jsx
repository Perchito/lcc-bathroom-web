import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Globals } from '@react-spring/web'
import './index.css'
import App from './App.jsx'

// Respect the OS "reduce motion" setting — springs jump straight to their end state.
if (
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
) {
  Globals.assign({ skipAnimation: true })
}

const app = (
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Built pages arrive already rendered (src/entry-server.jsx); `npm run dev` doesn't.
const root = document.getElementById('root')
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
