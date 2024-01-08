/* v8 ignore start */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google';
import NextUIProvider from '@repo/ui/NextUIProvider';
import ThemeProvider from '@/providers/theme';
import { cn } from '@/libs';
import '@repo/ui/style.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cross Calculator with Next.js',
  description: 'Cross Calculator with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja' suppressHydrationWarning>
      <body>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID ?? ''} />
        <ThemeProvider>
          <NextUIProvider className='h-full'>
            <div
              className={cn(
                'w-screen min-h-screen h-full grid place-items-center overflow-x-hidden bg-stone-200 dark:bg-stone-800',
                inter.className
              )}
            >
              {children}
            </div>
          </NextUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
