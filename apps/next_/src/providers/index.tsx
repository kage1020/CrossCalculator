"use client"

import { ComponentProps } from "@/types"
import { NextUIProvider } from "@repo/ui/NextUI"
import { ThemeProvider as NextThemeProvider } from "next-themes"

export default function Providers({ className, children }: ComponentProps) {
  return (
    <NextUIProvider className={className}>
      <NextThemeProvider attribute="class">{children}</NextThemeProvider>
    </NextUIProvider>
  )
}
