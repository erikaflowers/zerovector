import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname),
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  css: {
    // DevTools attributes each rule to its original source file
    // (hero-v2.css, nav-v2.css, etc.) instead of the injected <style>.
    devSourcemap: true,
  },
  server: {
    port: 5174,
    host: true,
  },
});
