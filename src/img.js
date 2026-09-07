// Responsive image helper.
//
// Real photos are uploaded through the CMS at full size. A build step
// (scripts/optimize-gallery.mjs) pre-generates small WebP variants + a tiny
// blur placeholder for each one, indexed in the manifest imported below.
//
//   photo(path, { sizes })  → <img> props: src / srcSet / sizes / width / height
//                             so the browser fetches a right-sized file and the
//                             layout doesn't shift as it loads.
//   blurFor(path)           → a data-URI for the blurred preview, or ''. Put it
//                             as a background on the *wrapper* element so the
//                             photo fades in over it (no grey flash).
//
// Anything without a manifest entry (SVG placeholders, the logo, a photo added
// since the last build) just falls back to its plain path.

import { asset } from './asset.js'
import manifest from './generated/gallery-images.json'

/**
 * @param {string} pathname  e.g. "/gallery/bath1.1.jpeg"
 * @param {object} [opts]
 * @param {string} [opts.sizes]  the CSS `sizes` attribute (how wide it renders)
 */
export function photo(pathname, { sizes } = {}) {
  const fallback = asset(pathname)
  const entry = manifest[pathname]
  if (!entry || !entry.variants?.length) {
    return sizes ? { src: fallback, sizes } : { src: fallback }
  }

  const largest = entry.variants[entry.variants.length - 1]
  return {
    src: asset(largest.src),
    srcSet: entry.variants.map((v) => `${asset(v.src)} ${v.w}w`).join(', '),
    sizes: sizes || '100vw',
    width: entry.width,
    height: entry.height,
  }
}

/** Blurred-preview data URI for a photo, or '' if there isn't one. */
export function blurFor(pathname) {
  return manifest[pathname]?.blur || ''
}

/** Inline style for a wrapper that should show the blurred preview behind it. */
export function blurStyle(pathname) {
  const blur = blurFor(pathname)
  return blur
    ? {
        backgroundImage: `url("${blur}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : undefined
}
