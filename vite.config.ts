import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import { generatePostsManifest } from './src/plugins/generatePostsManifest'

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    generatePostsManifest()
  ],
  base: './',
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
  optimizeDeps: {
    include: ['buffer'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: 'es2015',
    minify: 'terser'
  }
})
