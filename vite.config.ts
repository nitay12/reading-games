import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Project pages are served from https://<user>.github.io/reading-games/
export default defineConfig({
  base: '/reading-games/',
  plugins: [react()],
})
