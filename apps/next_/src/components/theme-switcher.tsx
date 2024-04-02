"use client"

import { Button } from "@repo/ui/NextUI"
import { Moon, Sun } from "@repo/ui/icons/react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <Button
      variant="light"
      isIconOnly
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
    </Button>
  )
}
