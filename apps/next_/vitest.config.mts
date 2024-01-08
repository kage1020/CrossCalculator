import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    alias: {
      '@': '/src',
    },
    exclude: ['node_modules', 'src/e2e'],
    coverage: {
      exclude: [
        'tailwind.config.ts',
        '.eslintrc.js',
        '.next',
        'next-env.d.ts',
        'next.config.js',
        'postcss.config.js',
        'playwright.config.ts',
        'src/e2e/*',
      ],
    },
  },
});
