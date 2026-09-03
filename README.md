# LCC Bathroom Web

Marketing website for **LCC Bathroom & Services** — a family-owned bathroom
remodeling and general construction company.

Built with [React 19](https://react.dev/) + [Vite](https://vite.dev/) and
[React Router](https://reactrouter.com/).

## Pages

| Route      | What it is                                                                   |
| ---------- | --------------------------------------------------------------------------- |
| `/`        | Home — statement, numbered service list, selected work, process, contact, and **client reviews** at the bottom |
| `/gallery` | Selected Work — filterable project grid with a click-to-open lightbox        |

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

**All site copy lives in one file: [`src/data/site.js`](src/data/site.js).**
Everything currently in there is placeholder text. Update these to go live:

- `company` — business name, established year, phone, email, license #, service area, hours, hero/statement copy
- `stats` — the typographic stat line under the hero
- `services` — the numbered service list
- `process` — the four "how it works" steps
- `reviews` — replace with real Google / Facebook reviews
- `gallery` — project list (`title`, `category`, `meta`, `blurb`, `image`)

## Adding real project photos

See **[PHOTOS.md](PHOTOS.md)** — it lists exactly which photo belongs in each
slot, where to get licensed stock images, and how to swap them in.

Short version: drop a JPG into `public/gallery/`, point the matching `gallery`
entry's `image` at it in `src/data/site.js` (and update the hero `src` in
`src/pages/Home.jsx` for the first one).

## Project structure

```
public/
  gallery/           placeholder project images (replace with real photos)
src/
  data/site.js       <-- ALL editable content
  components/         Header, Footer, Reviews, Stars
  pages/             Home.jsx, Gallery.jsx
  index.css          design system + component styles (one file)
  App.jsx            routes
  main.jsx           entry + router
PHOTOS.md            which photo goes in which slot
```

## Deploying

It's a static site — `npm run build` and host the `dist/` folder anywhere
(Netlify, Vercel, GitHub Pages, Cloudflare Pages). For client-side routing to
work on refresh, configure the host to fall back to `index.html`.
