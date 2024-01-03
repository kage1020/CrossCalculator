import type { Config } from 'tailwindcss';

const config: Omit<Config, 'content'> = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        astro: {
          light: '#8D46E7',
          dark: '#8D46E7',
        },
        gatsby: {
          light: '#663399',
          dark: '#663399',
        },
        next: {
          light: '#000000',
          dark: '#ffffff',
        },
        nuxt: {
          light: '#ffffff',
          dark: '#020420',
        },
        qwik: {
          light: '#006ce9',
          dark: '#006ce9',
        },
        react: {
          light: '#0074a6',
          dark: '#0074a6',
        },
        remix: {
          light: '#121212',
          dark: '#121212',
        },
        solid: {
          light: '#2c4f7c',
          dark: '#2c4f7c',
        },
        svelte: {
          light: '#ff3e00',
          dark: '#ff3e00',
        },
        vue: {
          light: '#3c8772',
          dark: '#3c8772',
        },
      },
    },
  },
};

export default config;
