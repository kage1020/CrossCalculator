import tailwindConfig from "@repo/tailwind-config"
import { ClassNameValue, extendTailwindMerge } from "tailwind-merge"
import { createTV } from "tailwind-variants"

const config = tailwindConfig

const twMerge = extendTailwindMerge(config)

export const cn = (...classNames: ClassNameValue[]) => twMerge(classNames)

export const tv = createTV(config)
