// @ts-check
import { defineConfig } from 'astro/config';
import { resolve } from 'path';

import tailwindcss from '@tailwindcss/vite';

import sentry from '@sentry/astro';
import spotlightjs from '@spotlightjs/astro';

export default defineConfig({
  site: 'https://Normandie-ai.github.io',
  base: '/',
  
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@components': resolve('./src/components'),
        '@layouts': resolve('./src/layouts'),
        '@interfaces': resolve('./src/interfaces'),
        '@styles': resolve('./src/styles'),
        '@lib': resolve('./src/lib'),
        '@assets': resolve('./src/assets')
      }
    }
  },

  integrations: [sentry(), spotlightjs()]
});