# Photos

All gallery photos are real LCC jobs, stored in `public/gallery/` and listed in
`src/content/gallery.json` (edit them in the CMS at `/admin` → Gallery).

- **Adding a project:** in the CMS, add a project, pick the gallery (Luxury or
  Council) and a category, upload the main photo and any extra photos.
- **Good photos:** finished rooms, well lit, level, no people or reflections of
  the photographer in mirrors. Portrait or landscape both work.
- `npm run build` makes the small WebP versions and blur previews automatically
  (`scripts/optimize-gallery.mjs`).

Share-preview images (1200×630) for each page are in `public/og/`.
