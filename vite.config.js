import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // GitHub Pages serves project sites from /<repository>/ rather than /.
  base: process.env.GITHUB_ACTIONS ? '/SpendWise/' : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
