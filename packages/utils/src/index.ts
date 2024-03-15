import { KEY, Key } from "@repo/data"
import tailwindConfig from "@repo/tailwind-config"
import { ClassNameValue, extendTailwindMerge } from "tailwind-merge"
import { createTV } from "tailwind-variants"

const config = tailwindConfig

const twMerge = extendTailwindMerge(config)

export const cn = (...classNames: ClassNameValue[]) => twMerge(classNames)

export const tv = createTV(config)

export const isNumber = (key: Key | undefined) =>
  !!key && !isNaN(Number(key.escapedValue))

export const isOperator = (key: Key | undefined) =>
  key && [KEY.ADD, KEY.SUBTRACT, KEY.MULTIPLY, KEY.DIVIDE].includes(key)

export function toKey(str: string) {
  switch (str) {
    case "c":
      return KEY.CLEAR
    case "d":
      return KEY.DIVIDE
    case "t":
      return KEY.MULTIPLY
    case "m":
      return KEY.SUBTRACT
    case "p":
      return KEY.ADD
    case "e":
      return KEY.EQUAL
    case ".":
      return KEY.DECIMAL
    default:
      return {
        label: str,
        value: isNaN(Number(str)) ? -1 : Number(str),
        escapedValue: str,
        row: 1,
        col: 1,
      }
  }
}

export function createUrl(keys: Key[], pathname: string = "/") {
  return `${pathname}?f=${keys.map(({ escapedValue }) => escapedValue).join("")}`
}

export function parseUrl(f: string) {
  const split: string[] = f.match(/Infinity|[0-9]+|[a-z]|./g) || []
  const results: Key[][] = []
  let temp: Key[] = []
  for (let i = 0; i < split.length; i++) {
    if (split[i] === KEY.CLEAR.escapedValue) {
      temp = []
      continue
    } else if (split[i] === KEY.EQUAL.escapedValue && i + 1 < split.length) {
      results.push([...temp, KEY.EQUAL, toKey(split[i + 1]!)])
      if (i + 2 < split.length && split[i + 2] !== KEY.CLEAR.escapedValue)
        temp = [toKey(split[i + 1]!)]
      else temp = []
      i++
    } else temp.push(toKey(split[i]!))
  }
  if (temp.length) results.push(temp)
  return results
}
