// ---------------------------------------------------------------------------
// SITE CONTENT — everything here is PLACEHOLDER text. Edit these values with
// the real business details, reviews, and project photos. Nothing else in the
// app needs to change to update the copy shown on the site.
// ---------------------------------------------------------------------------

export const company = {
  name: 'Luis Caiza Construction',
  shortName: 'LCC',
  tagline: 'Bathroom remodels and full-home construction, done right the first time.',
  intro:
    'Family-owned and operated, LCC has spent over 15 years turning worn-out ' +
    'bathrooms and tired spaces into rooms our clients are proud to show off. ' +
    'From a single shower replacement to a whole-home renovation, we handle the ' +
    'demo, the plumbing, the tile, and the finish work with one accountable crew.',
  yearsInBusiness: '15+',
  phone: '(555) 123-4567',
  phoneHref: 'tel:+15551234567',
  email: 'info@luiscaizaconstruction.com',
  serviceArea: 'Serving the Greater Metro area and surrounding towns',
  license: 'Licensed, bonded & insured — Lic. #000000',
  hours: 'Mon–Fri 7am–5pm · Saturday by appointment',
};

export const stats = [
  { value: '15+', label: 'Years in business' },
  { value: '600+', label: 'Projects completed' },
  { value: '5.0', label: 'Average review rating' },
  { value: '100%', label: 'Licensed & insured' },
];

export const services = [
  {
    id: 'bathroom-remodel',
    title: 'Bathroom Remodeling',
    description:
      'Full gut renovations to cosmetic refreshes — new layouts, vanities, ' +
      'lighting, and waterproofing built to last.',
    icon: 'bath',
  },
  {
    id: 'showers-tubs',
    title: 'Walk-in Showers & Tubs',
    description:
      'Custom tile showers, frameless glass, and safe, accessible walk-in ' +
      'conversions for aging in place.',
    icon: 'shower',
  },
  {
    id: 'tile-flooring',
    title: 'Tile & Flooring',
    description:
      'Precision tile setting, heated floors, and durable flooring for ' +
      'bathrooms, kitchens, and living areas.',
    icon: 'tile',
  },
  {
    id: 'kitchen-remodel',
    title: 'Kitchen Remodeling',
    description:
      'Cabinets, countertops, backsplashes, and layout changes that make the ' +
      'hardest-working room in the house work better.',
    icon: 'kitchen',
  },
  {
    id: 'additions',
    title: 'Home Additions',
    description:
      'Room additions, bump-outs, and basement finishing — permitted, framed, ' +
      'and finished by our team.',
    icon: 'addition',
  },
  {
    id: 'general-construction',
    title: 'General Construction & Repairs',
    description:
      'Drywall, framing, doors, trim, and the punch-list fixes that other ' +
      'contractors leave behind.',
    icon: 'tools',
  },
];

export const process = [
  {
    step: '1',
    title: 'Free in-home estimate',
    description:
      'We visit, take measurements, talk through what you want, and give you a ' +
      'clear written quote — no pressure.',
  },
  {
    step: '2',
    title: 'Design & materials',
    description:
      'We help you choose tile, fixtures, and finishes that fit your budget, ' +
      'then lock the schedule.',
  },
  {
    step: '3',
    title: 'Build',
    description:
      'One dedicated crew, daily cleanup, and honest updates. We protect your ' +
      'home and keep the dust contained.',
  },
  {
    step: '4',
    title: 'Walkthrough & warranty',
    description:
      'We review every detail together and stand behind our work with a ' +
      'written workmanship warranty.',
  },
];

export const reviews = [
  {
    name: 'Maria S.',
    location: 'Riverside',
    rating: 5,
    text:
      'LCC redid our main bathroom top to bottom. The tile work is flawless and ' +
      'they finished on schedule. Luis walked us through every decision.',
  },
  {
    name: 'David & Anne K.',
    location: 'Oak Hill',
    rating: 5,
    text:
      'We had three quotes and LCC was the only one that actually listened. The ' +
      'walk-in shower they built for my mother is beautiful and safe.',
  },
  {
    name: 'James T.',
    location: 'Downtown',
    rating: 5,
    text:
      'Professional crew, spotless job site, fair price. They found a hidden ' +
      'leak behind the old tub and fixed it right instead of covering it up.',
  },
  {
    name: 'Priya R.',
    location: 'Westgate',
    rating: 5,
    text:
      'Our kitchen and hall bath were done at the same time and the project ' +
      'still felt organized. Communication was excellent throughout.',
  },
  {
    name: 'Robert M.',
    location: 'Lakeshore',
    rating: 5,
    text:
      'Second project with LCC — a basement bathroom addition. Permits, ' +
      'plumbing, framing, all handled. I do not call anyone else now.',
  },
  {
    name: 'Elena V.',
    location: 'Pinecrest',
    rating: 5,
    text:
      'They transformed a cramped 1980s bathroom into something that looks like ' +
      'a magazine. Honest, tidy, and genuinely nice people.',
  },
];

// Gallery items. Replace `image` with real photos placed in /public/gallery/.
// Keep `category` to one of: 'Bathrooms', 'Kitchens', 'Additions'.
export const galleryCategories = ['All', 'Bathrooms', 'Kitchens', 'Additions'];

export const gallery = [
  {
    id: 'g1',
    title: 'Master bath — full renovation',
    category: 'Bathrooms',
    image: '/gallery/project-01.svg',
    blurb: 'Freestanding tub, curbless tile shower, double vanity.',
  },
  {
    id: 'g2',
    title: 'Walk-in shower conversion',
    category: 'Bathrooms',
    image: '/gallery/project-02.svg',
    blurb: 'Old alcove tub replaced with an accessible walk-in shower.',
  },
  {
    id: 'g3',
    title: 'Guest bath refresh',
    category: 'Bathrooms',
    image: '/gallery/project-03.svg',
    blurb: 'New vanity, mirror, lighting, and floor tile in a weekend.',
  },
  {
    id: 'g4',
    title: 'Kitchen remodel — open concept',
    category: 'Kitchens',
    image: '/gallery/project-04.svg',
    blurb: 'Removed a wall, new cabinets, quartz counters, tile backsplash.',
  },
  {
    id: 'g5',
    title: 'Kitchen island addition',
    category: 'Kitchens',
    image: '/gallery/project-05.svg',
    blurb: 'Custom island with seating and added storage.',
  },
  {
    id: 'g6',
    title: 'Basement bathroom addition',
    category: 'Additions',
    image: '/gallery/project-06.svg',
    blurb: 'New full bath framed and plumbed in an unfinished basement.',
  },
  {
    id: 'g7',
    title: 'Primary suite bump-out',
    category: 'Additions',
    image: '/gallery/project-07.svg',
    blurb: 'Added 120 sq ft for a larger bedroom and en-suite bath.',
  },
  {
    id: 'g8',
    title: 'Powder room tile feature wall',
    category: 'Bathrooms',
    image: '/gallery/project-08.svg',
    blurb: 'Statement tile, floating vanity, and modern fixtures.',
  },
  {
    id: 'g9',
    title: 'Heated floor bathroom',
    category: 'Bathrooms',
    image: '/gallery/project-09.svg',
    blurb: 'Radiant heated porcelain floor and a linear-drain shower.',
  },
];

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/gallery', label: 'Renovations' },
];
