// ---------------------------------------------------------------------------
// SITE CONTENT
//
// The editable content now lives in JSON files under `src/content/`, which are
// managed through the CMS at `/admin` (Sveltia CMS — see `public/admin/`).
// This file just wires that content into the shape the components expect, and
// keeps the few structural bits that are NOT meant to be edited in the CMS
// (navigation, gallery sectors + their category lists).
//
// Editing content: go to <your-site>/admin — no code needed.
// Editing layout / design / new sections: edit the components + this file.
// ---------------------------------------------------------------------------

import settings from '../content/settings.json'
import servicesContent from '../content/services.json'
import processContent from '../content/process.json'
import reviewsContent from '../content/reviews.json'
import galleryContent from '../content/gallery.json'

export const company = settings.company
export const stats = settings.stats
export const services = servicesContent.items
export const process = processContent.items
export const reviews = reviewsContent.items

// --- Structural config (not in the CMS) ------------------------------------

// The two portfolios. `id` on each gallery project (in gallery.json) must be
// one of these ids; `category` must be one of that sector's `categories`.
export const gallerySectors = [
  {
    id: 'luxury',
    path: '/gallery',
    label: 'Luxury Bathrooms',
    navLabel: 'Luxury Bathrooms',
    tagline: 'Private, design-led bathroom and home renovation.',
    intro:
      'High-end bathroom, kitchen, and addition work for private homes across ' +
      'London — our main line of work.',
    categories: ['All', 'Bathrooms', 'Kitchens', 'Additions'],
  },
  {
    id: 'council',
    path: '/council-bathrooms',
    label: 'Council Bathrooms',
    navLabel: 'Council Bathrooms',
    tagline: 'Bathroom renovations for the local authority.',
    intro:
      'Full bathroom refits, wet rooms, and accessible adaptations delivered ' +
      'for council and social-housing tenants — on schedule and to spec.',
    categories: ['All', 'Full refits', 'Wet rooms', 'Accessible adaptations'],
  },
]

// Kept for backwards compatibility — the luxury sector's category list.
export const galleryCategories = gallerySectors[0].categories

export const gallery = galleryContent.projects

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/reviews', label: 'Reviews' },
]
