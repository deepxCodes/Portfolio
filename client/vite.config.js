import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Detect if running in production (Render / Vercel) or local dev
const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: !isProduction
      ? {
          '/api': {
            target: 'http://localhost:5050', // local backend
            changeOrigin: true
          }
        }
      : undefined
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  },
  define: {
    __API_URL__: JSON.stringify(
      isProduction
        ? 'https://your-server.onrender.com/api' // 🔹 your Render server URL
        : 'http://localhost:5050/api'
    )
  }
})
