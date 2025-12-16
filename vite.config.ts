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
        secure: false
      },
      '/api/bookings': {
        target: 'https://poseidonsearchandbooking-production-98fe.up.railway.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/bookings/, '/bookings'),
        secure: false
      },
      '/api/payments': {
        target: 'https://poseidonpayments-production-b501.up.railway.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/payments/, '/api'),
        secure: false
      }
    }
  }
})