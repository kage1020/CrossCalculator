import Calculator from "@/components/calculator"
import FrameworkSwitcher from "@/components/framework-switcher"
import History from "@/components/history"
import { Suspense } from "react"

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center gap-8 min-h-screen w-full max-w-5xl mx-auto relative">
      <Suspense>
        <FrameworkSwitcher />
      </Suspense>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Suspense>
          <Calculator />
        </Suspense>
        <Suspense>
          <History />
        </Suspense>
      </div>
    </main>
  )
}
