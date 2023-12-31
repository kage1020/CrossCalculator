import type { Config } from 'tailwindcss';
import sharedConfig from '@repo/tailwind-config';
import { nextui } from '@nextui-org/react';

const config: Pick<Config, 'prefix' | 'presets' | 'content' | 'plugins'> = {
  content: ['./src/**/*.{tsx,vue}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  presets: [sharedConfig],
  plugins: [nextui()],
};

export default config;
