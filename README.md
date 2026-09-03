# LCC Bathroom Web

Marketing website for **LCC Bathroom & Services** — a family-owned bathroom
remodeling and general construction company.

Built with [React 19](https://react.dev/) + [Vite](https://vite.dev/) and
[React Router](https://reactrouter.com/). Motion is handled with
[react-spring](https://www.react-spring.dev/) — same setup as the
`fc-cleaning-web` project:

- `src/components/Reveal.jsx` + `src/hooks/useInViewOnce.js` — fade/rise a
  block in the first time it scrolls into view (`<Reveal delay={} y={}>`)
- staggered `useSpring` entrances on the home hero
- react-spring fade / pop on the gallery lightbox
- OS "reduce motion" is respected globally (`src/main.jsx`)

## Pages

| Route      | What it is                                                                   |
| ---------- | --------------------------------------------------------------------------- |
| `/`        | Home — statement, numbered service list, selected work, process, contact, and **client reviews** at the bottom |
| `/gallery` | **Luxury Bathrooms** — the main portfolio: filterable project grid with a click-to-open lightbox |
| `/council-bathrooms` | **Council Bathrooms** — the same grid filtered to local-authority / social-housing work |

Both galleries are the same page component with a toggle at the top to switch
between the two portfolios.

The design is editorial / architectural: serif display type (Newsreader),
generous whitespace, hairline rules, full-bleed photography.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build    # production build into dist/
npm run preview  # serve the production build locally
npm run lint     # oxlint
```

## Editing the content

**Non-technical editing:** the site has a CMS at **`/admin`** (Sveltia CMS).
Editable copy lives in JSON files under [`src/content/`](src/content/); the CMS
writes to those files and the site redeploys automatically. See
[CMS-SETUP.md](CMS-SETUP.md) for the one-time connection steps.

**In code:** [`src/data/site.js`](src/data/site.js) imports the `src/content/`
JSON and also holds the structural bits that are *not* in the CMS (navigation,
gallery sectors and their category lists). Fields you can change:

- `company` — business name, established year, phone, email, license #, service area, hours, hero/statement copy
- `stats` — the typographic stat line under the hero
- `services` — the numbered service list
- `process` — the four "how it works" steps
- `reviews` — replace with real Google / Facebook reviews
- `gallerySectors` — the two portfolios (`luxury`, `council`), each with its own route, intro copy, and category list
- `gallery` — project list (`sector`, `title`, `category`, `meta`, `blurb`, `image`); `sector` is `'luxury'` or `'council'` and `category` must be one from that sector's list

## Adding real project photos

See **[PHOTOS.md](PHOTOS.md)** — it lists exactly which photo belongs in each
slot, where to get licensed stock images, and how to swap them in.

Short version: drop a JPG into `public/gallery/`, point the matching `gallery`
entry's `image` at it in `src/data/site.js` (and update the hero `src` in
`src/pages/Home.jsx` for the first one).

## Project structure

```
public/
  admin/             Sveltia CMS (index.html + config.yml)
  gallery/           project images
src/
  content/           CMS-editable content (JSON) — settings, services, …
  data/site.js       adapter: imports src/content/ + structural config
  components/         Header, Footer, Reveal, Contact, …
  hooks/             useInViewOnce
  pages/             Home, Services, Gallery, Reviews
  index.css          design system + component styles (one file)
  App.jsx            routes
  main.jsx           entry + router
netlify.toml         build + SPA-fallback config
CMS-SETUP.md         one-time steps to connect the CMS
PHOTOS.md            which photo goes in which slot
```

## Deploying

Hosted on **Netlify** — every push to `main` auto-builds (`npm run build`) and
publishes `dist/`. `netlify.toml` handles the SPA fallback. See
[CMS-SETUP.md](CMS-SETUP.md) for the initial connection.
