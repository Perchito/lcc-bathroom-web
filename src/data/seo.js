// Per-page titles, descriptions and share images.
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
    title: 'Bathroom Renovations in London | LCC Bathrooms & Services',
    description:
      'Bathroom, shower room and cloakroom renovations across London. One in-house team from strip-out to finish. Rated 5.0 on Google. Free home visit and written quote.',
    image: '/og/home.jpg',
  },
  '/services': {
    title: 'Bathroom Renovation & Fitting Services in London | LCC',
    description:
      'Full bathroom renovations, walk-in showers and wet rooms, tiling, accessible bathrooms and the plumbing and carpentry around them. One accountable team in London.',
    image: '/og/services.jpg',
  },
  '/gallery': {
    title: 'Bathroom Renovation Projects in London | LCC Gallery',
    description:
      'Photos of bathrooms, shower rooms and cloakrooms we have renovated across London: marble, brass, bold tiles and loft bathrooms.',
    image: '/og/gallery.jpg',
  },
  '/council-bathrooms': {
    title: 'Council & Social Housing Bathroom Refits | LCC',
    description:
      'Bathroom and kitchen refits and level-access shower rooms for council and social-housing homes in London. Photos of recent council work.',
    image: '/og/council.jpg',
  },
  '/reviews': {
    title: 'Reviews: Rated 5.0 on Google | LCC Bathrooms & Services',
    description:
      'What our clients say about their bathroom renovations, word for word from our Google reviews.',
    image: '/og/reviews.jpg',
  },
  '/privacy': {
    title: 'Privacy Notice | LCC Bathrooms & Services',
    description: 'How LCC Bathrooms & Services uses and keeps the details you send us.',
    image: '/og/home.jpg',
  },
}

export function seoFor(pathname) {
  return pages[pathname] || pages['/']
}
