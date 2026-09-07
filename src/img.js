// Responsive image helper.
//
// Real photos are uploaded through the CMS at full size (a phone photo is
// ~2000px / 350 KB). Rather than ask the editor to resize anything, we route
// raster images through Netlify's Image CDN at request time: it resizes to the
// width actually needed, re-encodes to AVIF/WebP by content negotiation, and
// caches the result on the edge. SVG placeholders and the logo pass straight
// through untouched.
//
// Local `vite dev` / `vite preview` have no Netlify layer, so there we just
// serve the original file.

import { asset } from './asset.js'

const WIDTHS = [400, 640, 900, 1200, 1600, 2000]

function cdnEnabled() {
  if (import.meta.env.DEV) return false
  if (typeof window === 'undefined') return true
  return !/^(localhost$|127\.|0\.0\.0\.0$|\[?::1)/.test(window.location.hostname)
}

/**
 * Build <img> props (src + srcSet + sizes) for a photo path.
 * @param {string} path  e.g. "/gallery/bath1.1.jpeg"
 * @param {object} [opts]
 * @param {string} [opts.sizes]  the CSS `sizes` attribute (how wide it renders)
 * @param {number} [opts.quality=70]
 */
export function photo(path, { sizes, quality = 70 } = {}) {
  const src = asset(path)
  const raster = /\.(jpe?g|png|webp|avif)$/i.test(path)
  const remote = /^https?:\/\//.test(path)

  if (remote || !raster || !cdnEnabled()) {
    return sizes ? { src, sizes } : { src }
  }

  const at = (w) =>
    `/.netlify/images?url=${encodeURIComponent(src)}&w=${w}&q=${quality}`

  return {
    src: at(1200),
    srcSet: WIDTHS.map((w) => `${at(w)} ${w}w`).join(', '),
    sizes: sizes || '100vw',
    // If the image CDN ever fails to respond, fall back to the original file
    // so a photo still shows.
    onError: (e) => {
      const el = e.currentTarget
      if (el.dataset.fallback) return
      el.dataset.fallback = '1'
      el.srcset = ''
      el.src = src
    },
  }
}
