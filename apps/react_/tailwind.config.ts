import sharedConfig from "@repo/tailwind-config"
import type { Config } from "tailwindcss"

const config: Config = {
  presets: [sharedConfig],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
}

export default config
