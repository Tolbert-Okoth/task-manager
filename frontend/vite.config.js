import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Add this 'server' block
  server: {
    proxy: {
      // Any request starting with /api will be forwarded to the backend
      '/api': {
        target: 'http://localhost:5001', // Your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
})