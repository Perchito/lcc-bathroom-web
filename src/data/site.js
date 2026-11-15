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
export const accreditations = settings.accreditations || []
export const services = servicesContent.items
export const process = processContent.items
export const reviews = reviewsContent.items

// --- Structural config (not in the CMS) ------------------------------------

// The gallery portfolios (one for now; the toggle shows when there are two or more). `id` on each gallery project (in gallery.json) must be
// one of these ids; `category` must be one of that sector's `categories`.
export const gallerySectors = [
  {
    id: 'luxury',
    path: '/gallery',
    label: 'Luxury Bathrooms',
    navLabel: 'Luxury Bathrooms',
    tagline: 'Private, design-led bathroom and home renovation.',
    intro:
      'Bathrooms, shower rooms and cloakrooms we have built for homes across London.',
    categories: ['All', 'Bathrooms', 'Shower rooms', 'Cloakrooms'],
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

// Areas named on the Services page ("Recent jobs include homes in …").
export const areas = ['Barnes', 'Richmond', 'Tooting']

// Services page FAQ. Answers come from the owner's questionnaire (Nov 2026);
// keep them true: no prices on the site, guarantee is 1 year.
export const faq = [
  {
    q: 'How much does a new bathroom cost?',
    a: 'It depends on the size of the room, the work involved and the materials you choose, so we don’t list fixed prices. After a free home visit we send a clear written quote.',
  },
  {
    q: 'How long does a bathroom renovation take?',
    a: 'Around 10 working days for most bathrooms. Bigger or more complex rooms take longer, and we agree the dates with you before we start.',
  },
  {
    q: 'Do I need to move out?',
    a: 'No. You can stay at home while we work.',
  },
  {
    q: 'Will I have a working toilet?',
    a: 'Yes. We make sure you have a working toilet every night.',
  },
  {
    q: 'Can I buy my own suite and tiles?',
    a: 'Yes. We can supply everything, or you can buy your own materials if you prefer.',
  },
  {
    q: 'Is the work guaranteed?',
    a: 'Yes. Every job comes with a written 1-year workmanship guarantee, and we are insured for £5m public liability and £10m employers’ liability.',
  },
  {
    q: 'How do payments work?',
    a: 'Payment stages depend on the size of the project. We set them out in your written quote before any work starts.',
  },
  {
    q: 'Which areas do you cover?',
    a: 'All of London. Recent jobs include homes in Barnes, Richmond and Tooting.',
  },
]

// Homepage "Why choose us" section, in the owner's words (Nov 2026).
export const whyUs = {
  title: 'Why choose LCC Bathrooms & Services Ltd?',
  lead: 'More than bathroom installation. A professional service from start to finish.',
  intro: [
    'At LCC Bathrooms & Services Ltd, we believe a successful bathroom renovation starts with good planning, clear communication and proper project management.',
    'We don’t just turn up and start working. We follow a structured process to make sure every project is properly prepared, managed and monitored.',
  ],
  points: [
    { title: 'Proper planning', text: 'We visit the property, assess the working environment and carry out our own risk assessments before work begins.' },
    { title: 'Clear communication', text: 'We explain the process, discuss expectations and introduce the team assigned to your project.' },
    { title: 'Dedicated teams', text: 'Our installers and assistants work together, with clear responsibilities and detailed project briefings.' },
    { title: 'Health & safety', text: 'We carry out daily safety checks and are proud to have achieved PQS Health & Safety Approval following assessment against the SSIP Core Criteria.' },
    { title: 'Internal quality control', text: 'A dedicated member of our own team conducts inspections and completes Quality Control Reports at different stages of the renovation.' },
    { title: 'Complete bathroom renovations', text: 'From demolition and plumbing to tiling, installations and final finishing, we manage every stage of your bathroom transformation.' },
  ],
  promise: 'We believe in doing things properly, keeping our customers informed and taking responsibility for the quality of our work.',
  sign: 'We plan it. We manage it. We take responsibility.',
  tagline: 'Transforming spaces, one bathroom at a time.',
}
