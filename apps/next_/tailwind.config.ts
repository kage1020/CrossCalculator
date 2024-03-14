import sharedConfig from "@repo/tailwind-config"
import { NextUIConfig } from "@repo/ui/NextUI"
import type { Config } from "tailwindcss"

const config: Config = {
  presets: [sharedConfig, NextUIConfig],
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
}

export default config
