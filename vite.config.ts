# Atualize o vite.config.ts
@'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// IMPORTANTE: Para GitHub Pages, sempre use o nome do repositório
export default defineConfig({
  plugins: [react()],
  base: '/minha-agenda-diaria/', // ← NOME DO SEU REPOSITÓRIO
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
  // Configuração para desenvolvimento local
  server: {
    port: 5173,
    host: true
  }
})
'@ | Out-File -FilePath "vite.config.ts" -Encoding UTF8