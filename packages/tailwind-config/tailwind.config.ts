import { FRAMEWORKS } from "@repo/utils"
import type { Config } from "tailwindcss"

const config: Omit<Config, "content"> = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        astro: FRAMEWORKS.Astro.color,
        gatsby: FRAMEWORKS.Gatsby.color,
        next: FRAMEWORKS.Next.color,
        nuxt: FRAMEWORKS.Nuxt.color,
        qwik: FRAMEWORKS.qwik.color,
        react: FRAMEWORKS.React.color,
        remix: FRAMEWORKS.Remix.color,
        solid: FRAMEWORKS.Solid.color,
        svelte: FRAMEWORKS.Svelte.color,
        vue: FRAMEWORKS.Vue.color,
      },
    },
  },
}

export default config
