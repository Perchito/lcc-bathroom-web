# LCC Bathroom Web

Marketing website for **Luis Caiza Construction** — a family-owned bathroom
remodeling and general construction company.

Built with [React 19](https://react.dev/) + [Vite](https://vite.dev/) and
[React Router](https://reactrouter.com/).

## Pages

| Route      | What it is                                                                   |
| ---------- | --------------------------------------------------------------------------- |
| `/`        | Landing page — services, process, recent work, and **reviews** at the bottom |
| `/gallery` | Renovations gallery — filterable grid with a click-to-open lightbox          |

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

- `company` — business name, phone, email, license #, service area, hours
- `stats` — the headline numbers on the landing page
- `services` — the service cards
- `process` — the "how it works" steps
- `reviews` — replace with real Google / Facebook reviews
- `gallery` — project list (see below)

## Adding real project photos

1. Drop photos into `public/gallery/` (e.g. `public/gallery/master-bath-1.jpg`).
2. In `src/data/site.js`, edit the `gallery` array — set each item's `image` to
   `/gallery/your-file.jpg`, and update `title`, `category`, and `blurb`.
3. `category` must be one of: `Bathrooms`, `Kitchens`, `Additions` (or add a new
   one to `galleryCategories`).

The placeholder `.svg` files in `public/gallery/` can be deleted once real
photos are in.

## Project structure

```
public/
  gallery/            placeholder project images (replace with real photos)
  hero.svg            hero background
src/
  data/site.js        <-- ALL editable content
  components/         Header, Footer, Reviews, Stars, Icon
  pages/             Home.jsx, Gallery.jsx
  index.css          design system + component styles (one file)
  App.jsx            routes
  main.jsx           entry + router
```

## Deploying

It's a static site — `npm run build` and host the `dist/` folder anywhere
(Netlify, Vercel, GitHub Pages, Cloudflare Pages). For client-side routing to
work on refresh, configure the host to fall back to `index.html`.
