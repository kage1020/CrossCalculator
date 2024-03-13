# UI

## NextUI

You need to add the following code to your `tailwind.config.ts` file to use NextUI.

```ts
import { nextui } from '@nextui-org/react';

const config = {
    content: [
        // ...
        NEXTUI_CONTENT,
    ],
    darkMode: 'class',
    plugins: [
        // ...
        nextui(),
    ],
}
```

Then, it is essential to add the `NextUIProvider` at the root of your application.

```tsx
"use client"

import { NextUIProvider } from '@repo/ui/NextUI';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    );
}
```

If you want to use dark mode with Next.js, you can use `next-themes`.

```bash
pnpm add next-themes
```

Wrap you app with the `ThemeProvider` from `next-themes`.

```tsx
"use client"

import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
        </ThemeProvider>
    );
}
```

Then, you can use the `useTheme` hook to toggle the theme.

```tsx
"use client"

import { useTheme } from 'next-themes';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            Toggle Theme
        </button>
    );
}
```
