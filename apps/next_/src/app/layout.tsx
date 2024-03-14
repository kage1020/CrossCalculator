import Providers from "@/providers"
import { ChildrenProps } from "@/types"
import { GoogleTagManager } from "@next/third-parties/google"
import "@repo/ui/NextUI/default.css"
import { cn } from "@repo/utils"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cross Calculator with Next.js",
  description: "Cross Calculator with Next.js",
}

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="ja" suppressHydrationWarning className="h-full">
      <body
        className={cn(
          inter.className,
          "bg-stone-50 dark:bg-stone-900 transition duration-300 min-h-screen",
        )}
      >
        {process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID && (
          <GoogleTagManager
            gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}
          />
        )}
        <Providers className="h-full">{children}</Providers>
      </body>
    </html>
  )
}
