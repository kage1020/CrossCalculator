import { nextui } from "@nextui-org/react"
import { Config } from "tailwindcss"

const config: Pick<Config, "content" | "darkMode" | "plugins"> = {
  content: ["../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  plugins: [nextui()],
}

export default config
