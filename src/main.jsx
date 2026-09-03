import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
