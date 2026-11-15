// Per-page titles, descriptions and share images, plus the breadcrumb name
// and (for service pages) the Service details used in each page's JSON-LD.
//
// Used twice: by the app (src/components/Seo.jsx) to update the tab title as
// people click around, and by scripts/prerender-head.mjs, which writes a copy
// of index.html for each route with these tags already in it. Link previews
// (WhatsApp, Facebook, iMessage…) and search engines read that HTML directly.
//
// Plain data, no imports, so the Node build script can load it as-is.

export const SITE_URL = 'https://lccbathroom-services.com'
export const SITE_NAME = 'LCC Bathrooms & Services'

export const pages = {
  '/': {
    title: 'Bathroom Fitters in London | LCC Bathrooms & Services',
    description:
      'Bathroom fitters in London, including Barnes, Richmond and Tooting. Full renovations, shower rooms and wet rooms by one small team. Rated 5.0 on Google. Free home visit and quote.',
    image: '/og/home.jpg',
  },
  '/services': {
    name: 'Services',
    service: { name: 'Bathroom renovation and fitting', serviceType: 'Bathroom fitting and renovation' },
    title: 'Bathroom Renovation & Fitting Services in London | LCC',
    description:
      'Full bathroom renovations, shower rooms and wet rooms, accessible bathrooms, cloakrooms, tiling and plumbing. 30+ years in the trade. Answers on timings, guarantees and areas covered.',
    image: '/og/services.jpg',
  },
  '/gallery': {
    name: 'Gallery',
    title: 'Bathroom Renovation Projects in London | LCC Gallery',
    description:
      'Photos of bathrooms, shower rooms and cloakrooms we have renovated across London: marble, brass, bold tiles and loft bathrooms.',
    image: '/og/gallery.jpg',
  },
  '/reviews': {
    name: 'Reviews',
    title: 'Reviews: Rated 5.0 on Google | LCC Bathrooms & Services',
    description:
      'What our clients say about their bathroom renovations, word for word from our Google reviews.',
    image: '/og/reviews.jpg',
  },
  '/privacy': {
    name: 'Privacy notice',
    title: 'Privacy Notice | LCC Bathrooms & Services',
    description: 'How LCC Bathrooms & Services uses and keeps the details you send us.',
    image: '/og/home.jpg',
  },
}

export function seoFor(pathname) {
  return pages[pathname] || pages['/']
}
