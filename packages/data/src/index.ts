export type Framework = {
  label: string
  value: string
  href: string
  color: { light: string; dark: string }
}

export const FRAMEWORKS = {
  Astro: {
    label: "Astro",
    value: "astro",
    href: "/astro",
    color: { light: "#8D46E7", dark: "#8D46E7" },
  },
  Gatsby: {
    label: "Gatsby",
    value: "gatsby",
    href: "/gatsby",
    color: { light: "#663399", dark: "#663399" },
  },
  Next: {
    label: "Next.js",
    value: "next",
    href: "/next",
    color: { light: "#000000", dark: "#FFFFFF" },
  },
  Nuxt: {
    label: "Nuxt",
    value: "nuxt",
    href: "/nuxt",
    color: { light: "#00C16A", dark: "#00DC82" },
  },
  qwik: {
    label: "qwik",
    value: "qwik",
    href: "/qwik",
    color: { light: "#0093EE", dark: "#009DFD" },
  },
  React: {
    label: "React",
    value: "react",
    href: "/react",
    color: { light: "#0074A6", dark: "#0074A6" },
  },
  Remix: {
    label: "Remix",
    value: "remix",
    href: "/remix",
    color: { light: "#121212", dark: "#FFFFFF" },
  },
  Solid: {
    label: "Solid",
    value: "solid",
    href: "/solid",
    color: { light: "#2C4F7C", dark: "#2C4F7C" },
  },
  Svelte: {
    label: "Svelte",
    value: "svelte",
    href: "/svelte",
    color: { light: "#FF3E00", dark: "#FF3E00" },
  },
  Vue: {
    label: "Vue",
    value: "vue",
    href: "/vue",
    color: { light: "#42D392", dark: "#33A06F" },
  },
}

export const frameworks = Object.values(FRAMEWORKS) as Framework[]

export type Key = {
  label: string
  value: string | number
  escapedValue: string
  row: number
  col: number
}

export const KEY = {
  CLEAR: { label: "C", value: "c", escapedValue: "c", row: 1, col: 1 } as Key,
  DIVIDE: { label: "÷", value: "/", escapedValue: "d", row: 1, col: 1 } as Key,
  MULTIPLY: {
    label: "×",
    value: "*",
    escapedValue: "t",
    row: 1,
    col: 1,
  } as Key,
  SUBTRACT: {
    label: "−",
    value: "-",
    escapedValue: "m",
    row: 1,
    col: 1,
  } as Key,
  SEVEN: { label: "7", value: 7, escapedValue: "7", row: 1, col: 1 } as Key,
  EIGHT: { label: "8", value: 8, escapedValue: "8", row: 1, col: 1 } as Key,
  NINE: { label: "9", value: 9, escapedValue: "9", row: 1, col: 1 } as Key,
  ADD: { label: "＋", value: "+", escapedValue: "p", row: 2, col: 1 } as Key,
  FOUR: { label: "4", value: 4, escapedValue: "4", row: 1, col: 1 } as Key,
  FIVE: { label: "5", value: 5, escapedValue: "5", row: 1, col: 1 } as Key,
  SIX: { label: "6", value: 6, escapedValue: "6", row: 1, col: 1 } as Key,
  ONE: { label: "1", value: 1, escapedValue: "1", row: 1, col: 1 } as Key,
  TWO: { label: "2", value: 2, escapedValue: "2", row: 1, col: 1 } as Key,
  THREE: { label: "3", value: 3, escapedValue: "3", row: 1, col: 1 } as Key,
  EQUAL: { label: "＝", value: "=", escapedValue: "e", row: 2, col: 1 } as Key,
  ZERO: { label: "0", value: 0, escapedValue: "0", row: 1, col: 2 } as Key,
  DECIMAL: { label: ".", value: ".", escapedValue: ".", row: 1, col: 1 } as Key,
}

export const KEYS = Object.values(KEY) as Key[]
