'use client';

import { useTheme } from 'next-themes';
import Button from '@repo/ui/NextUIButton';
import { frameworks } from '@/libs';
import Icon from './icon';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function FrameworkSelect() {
  const { theme } = useTheme();
  const searchParams = useSearchParams();

  return (
    <div className='flex gap-2 flex-wrap justify-center' data-testid='frame-select'>
      {frameworks
        .filter((f) => f.value !== 'next')
        .map((f) => (
          <Button
            as={Link}
            href={`${f.href}?${searchParams.toString()}`}
            variant='bordered'
            key={f.value}
            className='w-28 grid grid-cols-3 !bg-stone-100 dark:!bg-stone-700 hover:!bg-stone-200 dark:hover:!bg-stone-600'
            data-testid={`${f.value}-button`}
          >
            <Icon
              icon={f.icon}
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
