"use client"

import Icon from "@/components/icon"
import ThemeSwitcher from "@/components/theme-switcher"
import { frameworks } from "@/libs"
import { Button, Card, CardBody, CardHeader } from "@repo/ui/NextUI"
import { Github, Next, X } from "@repo/ui/icons/react"
import { cn } from "@repo/utils"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function FrameworkSwitcher() {
  const searchParams = useSearchParams()
  const { theme } = useTheme()

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="justify-center flex-col gap-2">
        <h2 className="flex gap-2 items-center text-2xl">
          <Next />
          <span>Next.js + NextUI</span>
        </h2>
        <div className="flex items-center gap-8">
          <Button
            as={Link}
            href="https://github.com/kage1020/CrossCalculator"
            target="_blank"
            rel="noopener noreferrer"
            variant="light"
            isIconOnly
          >
            <Github size={20} />
          </Button>
          <Button
            as={Link}
            href="https://x.com/kage1020"
            target="_blank"
            rel="noopener noreferrer"
            variant="light"
            isIconOnly
          >
            <X size={20} />
          </Button>
          <ThemeSwitcher />
        </div>
      </CardHeader>
      <CardBody className="flex-row flex-wrap gap-2 justify-center">
        {frameworks.map((framework) => (
          <Button
            as={Link}
            href={`${framework.href}?${searchParams.toString()}`}
            variant="bordered"
            key={framework.value}
            className={cn(
              "w-28 grid grid-cols-3 rounded",
              framework.value === "astro" &&
                "hover:border-astro-light dark:hover:border-astro-dark",
              framework.value === "gatsby" &&
                "hover:border-gatsby-light dark:hover:border-gatsby-dark",
              framework.value === "nuxt" &&
                "hover:border-nuxt-light dark:hover:border-nuxt-dark",
              framework.value === "qwik" &&
                "hover:border-qwik-light dark:hover:border-qwik-dark",
              framework.value === "react" &&
                "hover:border-react-light dark:hover:border-react-dark",
              framework.value === "remix" &&
                "hover:border-remix-light dark:hover:border-remix-dark",
              framework.value === "solid" &&
                "hover:border-solid-light dark:hover:border-solid-dark",
              framework.value === "svelte" &&
                "hover:border-svelte-light dark:hover:border-svelte-dark",
              framework.value === "vue" &&
                "hover:border-vue-light dark:hover:border-vue-dark",
            )}
          >
            <Icon
              className="col-span-1 transition duration-300"
              icon={framework.icon}
              size={20}
              color={
                theme === "dark" ? framework.color.dark : framework.color.light
              }
            />
            <span className="col-span-2">{framework.label}</span>
          </Button>
        ))}
      </CardBody>
    </Card>
  )
}
