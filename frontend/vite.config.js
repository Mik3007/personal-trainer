import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: '.',  // Assicurati che questo punti alla directory corretta
  plugins: [react()],
  build: {
    rollupOptions: {
      input: './index.html'  // Indica esplicitamente il percorso di `index.html`
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
