// Resolve a path that lives in /public against Vite's `base`, so assets load
// both locally (base "/") and on GitHub Pages (base "/lcc-bathroom-web/").
// Accepts "/logo.png" or "logo.png"; ignores absolute URLs.
export function asset(path) {
  if (/^https?:\/\//.test(path)) return path
  return import.meta.env.BASE_URL + String(path).replace(/^\//, '')
}
