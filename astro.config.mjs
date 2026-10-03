// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Fully static output (no backend).
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});