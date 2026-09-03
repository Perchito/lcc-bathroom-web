// ---------------------------------------------------------------------------
// SITE CONTENT — everything here is PLACEHOLDER text. Edit these values with
// the real business details, reviews, and project photos. Nothing else in the
// app needs to change to update the copy shown on the site.
//
// Images: see PHOTOS.md for exactly which photo goes in each slot.
// ---------------------------------------------------------------------------

export const company = {
  name: 'Luis Caiza Construction',
  shortName: 'LCC',
  established: '2009',
  tagline: 'Bathrooms built to last.',
  heroSupport:
    'Design-led bathroom remodeling and home construction for houses across ' +
    'the metro. One accountable crew, from demolition to the final coat of paint.',
  statement:
    'Luis Caiza Construction is a family-run remodeling company. We have spent ' +
    'more than fifteen years rebuilding bathrooms, kitchens, and additions with ' +
    'a small, skilled crew that handles every trade in-house — no rotating cast ' +
    'of subcontractors, no surprises on the invoice. The result is careful work, ' +
    'delivered on the schedule we promised.',
  yearsInBusiness: '15+',
  phone: '(555) 123-4567',
  phoneHref: 'tel:+15551234567',
  email: 'info@luiscaizaconstruction.com',
  serviceArea: 'Greater Metro area & surrounding towns',
  license: 'Licensed, bonded & insured — Lic. #000000',
  hours: 'Monday–Friday, 7am–5pm · Saturday by appointment',
};

export const stats = [
  { value: '15 years', label: 'in business' },
  { value: '600+', label: 'projects completed' },
  { value: 'In-house', label: 'crew, every trade' },
  { value: 'Licensed', label: 'bonded & insured' },
];

export const services = [
  {
    id: 'bathroom-remodel',
    title: 'Bathroom Remodeling',
    description:
      'Full gut renovations and cosmetic refreshes — new layouts, vanities, ' +
      'lighting, and waterproofing detailed to last decades, not seasons.',
  },
  {
    id: 'showers-tubs',
    title: 'Walk-in Showers & Tubs',
    description:
      'Custom tile showers, frameless glass, and accessible walk-in conversions ' +
      'for aging in place — built with proper slope, drainage, and membrane.',
  },
  {
    id: 'tile-flooring',
    title: 'Tile & Stone',
    description:
      'Precision tile setting, natural stone, heated floors, and feature walls ' +
      'laid out by hand so the pattern reads right in the finished room.',
  },
  {
    id: 'kitchen-remodel',
    title: 'Kitchen Remodeling',
    description:
      'Cabinetry, countertops, backsplashes, and layout changes for the ' +
      'hardest-working room in the house.',
  },
  {
    id: 'additions',
    title: 'Additions & Bump-outs',
    description:
      'Room additions, primary-suite expansions, and basement finishing — ' +
      'permitted, framed, and finished by our team.',
  },
  {
    id: 'general-construction',
    title: 'General Carpentry & Repairs',
    description:
      'Framing, drywall, doors, trim, and the punch-list details that other ' +
      'contractors leave unfinished.',
  },
];

export const process = [
  {
    step: '01',
    title: 'Estimate',
    description:
      'We visit, measure, talk through what you want, and send a clear written ' +
      'quote. No pressure, no fee.',
  },
  {
    step: '02',
    title: 'Design & selections',
    description:
      'We help you choose tile, fixtures, and finishes within your budget, then ' +
      'lock the schedule and order materials.',
  },
  {
    step: '03',
    title: 'Build',
    description:
      'One dedicated crew. Daily cleanup, dust containment, and honest updates ' +
      'until the room is done.',
  },
  {
    step: '04',
    title: 'Walkthrough & warranty',
    description:
      'We review every detail together and back the work with a written ' +
      'workmanship warranty.',
  },
];

export const reviews = [
  {
    name: 'Maria S.',
    location: 'Riverside',
    rating: 5,
    text:
      'LCC rebuilt our main bathroom top to bottom. The tile work is flawless ' +
      'and they finished on the day they said they would. Luis walked us ' +
      'through every decision.',
  },
  {
    name: 'David & Anne K.',
    location: 'Oak Hill',
    rating: 5,
    text:
      'We had three quotes and LCC was the only one that actually listened. The ' +
      'walk-in shower they built for my mother is beautiful and genuinely safe.',
  },
  {
    name: 'James T.',
    location: 'Downtown',
    rating: 5,
    text:
      'Professional crew, spotless job site, fair price. They found a hidden ' +
      'leak behind the old tub and fixed it properly instead of tiling over it.',
  },
  {
    name: 'Priya R.',
    location: 'Westgate',
    rating: 5,
    text:
      'Our kitchen and hall bath were done at the same time and the project ' +
      'still felt organized. Communication was excellent from start to finish.',
  },
  {
    name: 'Robert M.',
    location: 'Lakeshore',
    rating: 5,
    text:
      'Second project with LCC — a basement bathroom addition. Permits, ' +
      'plumbing, framing, all handled. I don’t call anyone else now.',
  },
  {
    name: 'Elena V.',
    location: 'Pinecrest',
    rating: 5,
    text:
      'They turned a cramped 1980s bathroom into something that looks like a ' +
      'magazine. Honest, tidy, and genuinely good people to have in your home.',
  },
];

// Gallery items. Replace `image` with real photos placed in /public/gallery/.
// `category` must be one of the values in `galleryCategories` (minus 'All').
// `meta` is the small-caps line shown under each project title.
export const galleryCategories = ['All', 'Bathrooms', 'Kitchens', 'Additions'];

export const gallery = [
  {
    id: 'g1',
    title: 'Master bath, fully rebuilt',
    category: 'Bathrooms',
    meta: 'Full renovation · Riverside',
    image: '/gallery/project-01.svg',
    blurb: 'Freestanding tub, curbless tile shower, and a double vanity in a reworked layout.',
  },
  {
    id: 'g2',
    title: 'Walk-in shower conversion',
    category: 'Bathrooms',
    meta: 'Accessibility remodel · Oak Hill',
    image: '/gallery/project-02.svg',
    blurb: 'An old alcove tub replaced with a low-threshold, grab-bar-ready shower.',
  },
  {
    id: 'g3',
    title: 'Guest bath refresh',
    category: 'Bathrooms',
    meta: 'Cosmetic remodel · Downtown',
    image: '/gallery/project-03.svg',
    blurb: 'New vanity, mirror, lighting, and floor tile — completed in a single week.',
  },
  {
    id: 'g4',
    title: 'Open-concept kitchen',
    category: 'Kitchens',
    meta: 'Wall removal + remodel · Westgate',
    image: '/gallery/project-04.svg',
    blurb: 'Removed a load-bearing wall, new cabinetry, quartz counters, tile backsplash.',
  },
  {
    id: 'g5',
    title: 'Kitchen island addition',
    category: 'Kitchens',
    meta: 'Cabinetry · Lakeshore',
    image: '/gallery/project-05.svg',
    blurb: 'A custom island with seating, storage, and a second prep sink.',
  },
  {
    id: 'g6',
    title: 'Basement bathroom addition',
    category: 'Additions',
    meta: 'New full bath · Pinecrest',
    image: '/gallery/project-06.svg',
    blurb: 'A full bath framed, plumbed, and permitted in a previously unfinished basement.',
  },
  {
    id: 'g7',
    title: 'Primary-suite bump-out',
    category: 'Additions',
    meta: '120 sq ft addition · Oak Hill',
    image: '/gallery/project-07.svg',
    blurb: 'Added floor area for a larger bedroom and a private en-suite bath.',
  },
  {
    id: 'g8',
    title: 'Powder room, feature wall',
    category: 'Bathrooms',
    meta: 'Cosmetic remodel · Riverside',
    image: '/gallery/project-08.svg',
    blurb: 'Statement tile, a floating vanity, and warm integrated lighting.',
  },
  {
    id: 'g9',
    title: 'Heated-floor bathroom',
    category: 'Bathrooms',
    meta: 'Full renovation · Westgate',
    image: '/gallery/project-09.svg',
    blurb: 'Radiant heated porcelain floor with a linear-drain curbless shower.',
  },
];

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/gallery', label: 'Selected Work' },
];
