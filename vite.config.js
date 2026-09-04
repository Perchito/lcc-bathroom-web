import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Served from the domain root on Netlify.
export default defineConfig({
  base: '/',
  plugins: [react()],
})
