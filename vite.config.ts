import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Configuração para GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/minha-agenda/',
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['date-fns', 'uuid']
        }
      }
    }
  },
  
  // Configuração para desenvolvimento
  server: {
    port: 5173,
    host: true
  }
})