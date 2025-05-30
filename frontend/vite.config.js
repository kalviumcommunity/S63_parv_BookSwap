import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'production' 
          ? 'https://bookswap-f15c.onrender.com'
          : 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
