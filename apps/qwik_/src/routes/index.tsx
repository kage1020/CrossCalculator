import { component$ } from "@builder.io/qwik"
import type { DocumentHead } from "@builder.io/qwik-city"

export default component$(() => {
  return <div class="grid place-items-center h-screen">Hello World</div>
})

export const head: DocumentHead = {
  title: "Cross Calculator with Qwik",
  meta: [
    {
      name: "description",
      content: "Cross Calculator with Qwik",
    },
  ],
}
