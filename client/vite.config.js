import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/videogames': 'http://localhost:3001',
      '/genres': 'http://localhost:3001',
      '/platforms': 'http://localhost:3001',
    }
  }
})
