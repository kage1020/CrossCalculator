'use client';

import NextUIButton from '@repo/ui/NextUIButton';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@repo/ui/ReactIcons';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    const localTheme = localStorage.getItem('theme');
    const matches = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (localTheme === 'dark' || (!localTheme && matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const onClick = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  if (!mounted) return <NextUIButton isLoading isIconOnly variant='light' />;

  return (
    <NextUIButton isIconOnly variant='light' onClick={onClick}>
      {theme === 'dark' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
    </NextUIButton>
  );
}
