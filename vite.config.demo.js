import { defineConfig } from 'vite';

export default defineConfig({
  // base: './' asegura que todas las rutas sean relativas para que funcione en subcarpetas de GitHub Pages
  base: './', 
  build: {
    outDir: 'dist-demo',
    emptyOutDir: true
  }
});
