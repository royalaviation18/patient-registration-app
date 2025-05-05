import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  base: './',
  plugins: [svelte()],
  optimizeDeps: {
    exclude: ['@electric-sql/pglite'],
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['@electric-sql/pglite'],
    },
  },
});
