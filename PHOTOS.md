# Photos — what goes where

Every image on the site is a placeholder SVG in `public/gallery/`. Replace each
one with a real photo (same filename, or a new filename + update
`src/data/site.js`). Aim for **landscape 4:3, at least 1600px wide, JPG**.

## Where to get licensed photos

Free for commercial use, no attribution required:

- **Unsplash** — https://unsplash.com/s/photos/bathroom-remodel
- **Pexels** — https://www.pexels.com/search/bathroom%20renovation/
- Or, best option: real photos of Luis's own completed jobs (phone photos are
  fine if they're well lit and level).

Search terms that work well: `modern bathroom`, `walk-in shower tile`,
`bathroom vanity`, `kitchen remodel`, `tile installation`, `contractor working`.

## The slots

| File | Used on | Suggested shot |
| ---- | ------- | -------------- |
| `project-01.svg → .jpg` | **Homepage hero** + first project | Best finished bathroom — wide, bright, straight-on |
| `project-02.svg → .jpg` | Homepage feature + gallery | Walk-in shower, glass door, tile detail |
| `project-03.svg → .jpg` | Homepage feature + gallery | Smaller guest bath, vanity + mirror |
| `project-04.svg → .jpg` | Gallery | Kitchen, wide angle showing cabinets + counters |
| `project-05.svg → .jpg` | Gallery | Kitchen island, close-ish |
| `project-06.svg → .jpg` | Gallery | Finished basement bathroom |
| `project-07.svg → .jpg` | Gallery | Bedroom / suite addition interior |
| `project-08.svg → .jpg` | Gallery | Powder room with a bold tile wall |
| `project-09.svg → .jpg` | Gallery | Bathroom floor / shower, moody lighting |

## How to swap one in

1. Save the photo as e.g. `public/gallery/project-01.jpg`.
2. In `src/data/site.js`, find the matching entry in the `gallery` array and
   change `image: '/gallery/project-01.svg'` to `'/gallery/project-01.jpg'`.
3. For the hero specifically, also update the `src` in
   `src/pages/Home.jsx` (search for `PHOTO 1`).
4. Delete the leftover `.svg` placeholders when you're done.

## A note on the look

The design converts photos to a slight grayscale on the page and removes it on
hover (gallery) for an editorial feel. If you'd rather show full color
everywhere, remove the `filter: grayscale(...)` lines in `src/index.css`
(they're on `.hero__figure img`, `.work__figure img`, and `.project__figure img`).
