import sharedConfig from "@repo/tailwind-config"
import type { Config } from "tailwindcss"

const config: Config = {
  presets: [sharedConfig],
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
