import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// `base` matches the GitHub Pages project path:
// https://<user>.github.io/lcc-bathroom-web/
export default defineConfig({
  base: '/lcc-bathroom-web/',
  plugins: [react()],
})
