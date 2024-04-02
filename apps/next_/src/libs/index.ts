import {
  Framework as FrameworkWithoutIcon,
  frameworks as frameworksWithoutIcon,
} from "@repo/data"
import {
  Astro,
  Gatsby,
  IconType,
  Nuxt,
  Qwik,
  React,
  Remix,
  Solid,
  Svelte,
  Vue,
} from "@repo/ui/icons/react"

const icons = [Astro, Gatsby, Nuxt, Qwik, React, Remix, Solid, Svelte, Vue]

export type Framework = FrameworkWithoutIcon & { icon: IconType }

export const frameworks: Framework[] = frameworksWithoutIcon
  .filter((v) => v.value !== "next")
  .map((framework, index) => ({
    ...framework,
    icon: icons[index]!,
  }))
