"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-4 right-4 p-2 bg-white dark:bg-black rounded-full"
    >
      {theme === "dark" ? "🌞" : "🌜"}
    </button>
  )
}
