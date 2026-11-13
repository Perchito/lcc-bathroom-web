// After `vite build`: give every route its own HTML file with the full page
// already rendered (src/entry-server.jsx) and the right <title>, description,
// canonical and share-preview tags in place. Also writes 404.html.
//
// The site is a single-page app, so without this every URL serves the same
// index.html, and link previews (WhatsApp, Facebook, iMessage), which don't run
// JavaScript, would show the homepage text for every page.
//
// Cloudflare's asset handling serves /services from services.html, so each
// route gets dist/<route>.html. Also writes sitemap.xml and robots.txt.

import { readFile, writeFile } from 'node:fs/promises'
import { SITE_URL, pages } from '../src/data/seo.js'
import { render } from '../dist-ssr/entry-server.js'

const DIST = 'dist'
const html = await readFile(`${DIST}/index.html`, 'utf8')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function swap(source, re, value, route) {
  if (!re.test(source)) throw new Error(`prerender-head: ${re} not found (route ${route})`)
  return source.replace(re, value)
}

function headFor(route, page) {
  const url = SITE_URL + route
  const image = SITE_URL + page.image
  let out = html
  out = swap(out, /<title>[^<]*<\/title>/, `<title>${esc(page.title)}</title>`, route)
  out = swap(out, /(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${esc(page.description)}$2`, route)
  out = swap(out, /(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`, route)
  out = swap(out, /(<meta property="og:title" content=")[^"]*(")/, `$1${esc(page.title)}$2`, route)
  out = swap(out, /(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${esc(page.description)}$2`, route)
  out = swap(out, /(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`, route)
  out = swap(out, /(<meta property="og:image" content=")[^"]*(")/, `$1${image}$2`, route)
  out = swap(out, /<div id="root"><\/div>/, `<div id="root">${render(route)}</div>`, route)
  return out
}

for (const [route, page] of Object.entries(pages)) {
  const file = route === '/' ? 'index.html' : `${route.slice(1)}.html`
  await writeFile(`${DIST}/${file}`, headFor(route, page))
}

// Unknown URLs: Cloudflare serves this with a 404 status (wrangler.jsonc).
const notFound = headFor('/404', {
  title: 'Page not found | LCC Bathrooms & Services',
  description: "We can't find that page.",
  image: '/og/home.jpg',
}).replace(/<link rel="canonical"[^>]*>\n?/, '').replace('<head>', '<head>\n    <meta name="robots" content="noindex" />')
await writeFile(`${DIST}/404.html`, notFound)

const today = new Date().toISOString().slice(0, 10)
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  Object.keys(pages)
    .map((route) => `  <url><loc>${SITE_URL}${route}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n') +
  '\n</urlset>\n'
await writeFile(`${DIST}/sitemap.xml`, sitemap)
await writeFile(`${DIST}/robots.txt`, `User-agent: *\nDisallow: /admin/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)

console.log(`[prerender-head] ${Object.keys(pages).length} pages + 404.html + sitemap.xml + robots.txt`)
