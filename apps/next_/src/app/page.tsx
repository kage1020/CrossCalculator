import ThemeSwitcher from "@/components/theme-switcher"
import { Card, CardBody } from "@nextui-org/card"

export default function Home() {
  return (
    <main>
      <ThemeSwitcher />
      <Card>
        <CardBody>Hello World!</CardBody>
      </Card>
    </main>
  )
}
