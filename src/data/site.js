// ---------------------------------------------------------------------------
// SITE CONTENT — everything here is PLACEHOLDER text. Edit these values with
// the real business details, reviews, and project photos. Nothing else in the
// app needs to change to update the copy shown on the site.
//
// Images: see PHOTOS.md for exactly which photo goes in each slot.
// ---------------------------------------------------------------------------

export const company = {
  name: 'LCC Bathroom & Services',
  shortName: 'LCC',
  established: '2009',
  tagline: 'Bathrooms built to last.',
  heroSupport:
    'Design-led bathroom remodeling and home construction for houses across ' +
    'the metro. One accountable crew, from demolition to the final coat of paint.',
  statement:
    'LCC Bathroom & Services is a family-run remodeling company. We have spent ' +
    'more than fifteen years rebuilding bathrooms, kitchens, and additions with ' +
    'a small, skilled crew that handles every trade in-house — no rotating cast ' +
    'of subcontractors, no surprises on the invoice. The result is careful work, ' +
    'delivered on the schedule we promised.',
  yearsInBusiness: '15+',
  // Real contact details from the Google Business Profile.
  phone: '07477 570370',
  phoneHref: 'tel:+447477570370',
  email: 'info@luiscaizaconstruction.com',
  serviceArea: 'Greater Metro area & surrounding towns',
  license: 'Licensed, bonded & insured — Lic. #000000',
  hours: 'Monday–Friday, 7am–5pm · Saturday by appointment',
  // Google Business Profile: LCC' Bathroom & Services (5.0, 8 reviews)
  googleReviewsUrl: 'https://www.google.com/maps?cid=7455693700287610574',
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

// Real Google reviews for LCC' Bathroom & Services (5.0 average, 8 reviews).
// Pulled from the Google Business Profile — text is verbatim. `job` is a short
// context label; `when` is roughly when it was posted.
export const reviews = [
  {
    name: 'Crystal Chiu',
    job: 'Under-stairs WC, built from scratch',
    when: '2026',
    rating: 5,
    text:
      'Luis and his team did an incredible job building our under-stairs toilet ' +
      'from scratch, including all the pipework, wall construction, panelling ' +
      'and finishing. We’re so pleased with the result! The workmanship is ' +
      'excellent and the finish is beautiful. Luis was a pleasure to work with ' +
      'throughout: kind, communicative, patient and genuinely invested in ' +
      'finding solutions that worked for our needs and budget. He took great ' +
      'care at every stage, including keeping everything tidy, and was always ' +
      'happy to come back and tweak anything we needed. We couldn’t recommend ' +
      'him and his team more highly.',
  },
  {
    name: 'Andrew Cebula',
    job: 'Bathroom, kitchen & plumbing',
    when: '2025',
    rating: 5,
    text:
      'Luis is absolutely amazing. He has done several jobs for us, ranging ' +
      'from installing radiators and plumbing works all the way up to kitchen ' +
      'rearrangement and full bathroom installation. The work quality is ' +
      'fantastic and he is very reliable. A great recommendation and we’re ' +
      'pleased to know him. He’s got such a can-do attitude which is rare to ' +
      'find, love it!!',
  },
  {
    name: 'Alejandra Limones',
    job: 'Repeat client, various works',
    when: '2025',
    rating: 5,
    text:
      'Luis has done numerous jobs for me over the years. He is incredibly ' +
      'reliable, hard working and fairly priced. Luis goes the extra mile to ' +
      'ensure that the work done is of outstanding quality and does not cut ' +
      'corners. He is a real pleasure to deal with and I highly recommend him!',
  },
  {
    name: 'Elizabeth Clarke',
    job: 'Full accessible bathroom refit',
    when: '2025',
    rating: 5,
    text:
      'We have been so happy with Luis’s work. He works to the very highest ' +
      'standards, is meticulous and always responds very promptly to any ' +
      'query. He replaced an entire bathroom for us to make it more suitable ' +
      'for my 95 year old mother and the project was done comfortably within ' +
      'the timeframe he estimated and everything was immaculate. We will use ' +
      'Luis for any future work. He is an absolute professional and extremely ' +
      'courteous.',
  },
  {
    name: 'Paul Archdeacon',
    job: 'New bathroom',
    when: '2025',
    rating: 5,
    text:
      'Pleased to recommend Luis. Very happy with my new bathroom. He helped ' +
      'with design ideas and also resolved the inevitable problems. It’s a ' +
      'better result than I expected. I will definitely reach out to Luis for ' +
      'any future work.',
  },
  {
    name: 'David Price',
    job: 'Electric mirror installation',
    when: '2026',
    rating: 5,
    text:
      'LCC came and installed a very large, electric mirror for us and the ' +
      'results are amazing. They were working on a house nearby and my wife ' +
      'asked them if they could have a look and install it; once they’d ' +
      'finished the work for our neighbour, they came over and less than an ' +
      'hour later it was done — and what an amazing job they have done. Would ' +
      'thoroughly recommend LCC for the work and super speedy service, thanks ' +
      'so much guys.',
  },
  {
    name: 'Cristian Cussen',
    job: 'General works · London',
    when: '2025',
    rating: 5,
    text:
      'Simply the best. I unequivocally recommend Luis. He is a total ' +
      'professional — the most capable and reliable that I’ve worked with in ' +
      'London.',
  },
  {
    name: 'Nina Gajjar',
    job: 'Handyman services',
    when: '2025',
    rating: 5,
    text:
      'Amazing work done by Luis. Exceptional service provided. Luis is ' +
      'extremely knowledgeable. Would thoroughly recommend Luis and his ' +
      'professional services.',
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
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Selected Work' },
  { to: '/reviews', label: 'Reviews' },
];
