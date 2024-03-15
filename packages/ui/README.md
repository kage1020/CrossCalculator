# UI

## NextUI

You need to add the following code to your `tailwind.config.ts` file to use NextUI.

```ts
import { NextUIConfig } from '@repo/ui/NextUI';

const config = {
    presets: [
        // ...
        NextUIConfig,
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

And, import Tailwind classes for NextUI components in root layout.

```tsx
import "@repo/ui/NextUI/default.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>
                {children}
            </body>
        </html>
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
