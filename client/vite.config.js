import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/videogames': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/genres': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/platforms': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    }
  }
})
