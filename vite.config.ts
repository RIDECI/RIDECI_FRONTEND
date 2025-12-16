import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    global: 'window'
  },
  server: {
    proxy: {
      '/api/travels': {
        target: 'https://nemesistravelmanagementbackend-production.up.railway.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/travels/, '/travels'),
        secure: false,
      }
    }
  }
})