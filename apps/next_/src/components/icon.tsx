"use client"

import { ClassNameProps } from "@/types"
import { IconBaseProps, IconType, Loading } from "@repo/ui/icons/react"
import { useEffect, useState } from "react"

export default function Icon({
  className,
  color,
  size,
  icon,
}: Pick<IconBaseProps, "color" | "size" | "children"> & {
  icon: IconType
} & ClassNameProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <Loading className={className} duration="1s" />

  return icon({ className, color, size })
}
