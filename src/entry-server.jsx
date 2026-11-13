// Server render used at build time by scripts/prerender-head.mjs, so every
// route ships its full page HTML (not just an empty #root). Search engines and
// AI crawlers that don't run JavaScript read this; the browser then hydrates it.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App.jsx'

export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}
