import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://yuenushan.github.io',
  base: '/ticnav',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
