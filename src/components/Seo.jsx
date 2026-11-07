import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_URL, seoFor } from '../data/seo.js'

// Keeps the tab title, description, canonical and share tags in step with the
// route as people click around. The first page load already has them baked in
// (scripts/prerender-head.mjs); this only matters after client-side navigation.
function setMeta(selector, value) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(el.tagName === 'LINK' ? 'href' : 'content', value)
}

export default function Seo() {
  const { pathname } = useLocation()
  useEffect(() => {
    const page = seoFor(pathname)
    const url = SITE_URL + (pathname === '/' ? '/' : pathname)
    document.title = page.title
    setMeta('meta[name="description"]', page.description)
    setMeta('link[rel="canonical"]', url)
    setMeta('meta[property="og:title"]', page.title)
    setMeta('meta[property="og:description"]', page.description)
    setMeta('meta[property="og:url"]', url)
    setMeta('meta[property="og:image"]', SITE_URL + page.image)
  }, [pathname])
  return null
}
