'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import Button from '@repo/ui/NextUIButton';
import { frameworks } from '@/libs';

export default function FrameworkSelect() {
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className='flex gap-2 flex-wrap justify-center'>
      {frameworks.map((f) => (
        <Button
          variant='bordered'
          key={f.value}
          className='w-28 grid grid-cols-3 !bg-stone-100 dark:!bg-stone-700 hover:!bg-stone-200 dark:hover:!bg-stone-600'
          onClick={() => router.push(f.href)}
        >
          <f.icon
            size={20}
            color={theme === 'dark' ? f.color.dark : f.color.light}
            className='col-span-1'
          />
          <span className='col-span-2'>{f.label}</span>
        </Button>
      ))}
    </div>
  );
}
