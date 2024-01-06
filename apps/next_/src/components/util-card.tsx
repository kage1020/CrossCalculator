'use client';

import { Card, CardBody, CardHeader } from '@repo/ui/NextUICard';
import Icon from './icon';
import { GithubIcon, NextIcon, XIcon } from '@repo/ui/ReactIcons';
import { frameworks } from '@/libs';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import ThemeSwitcher from './theme-switcher';
import FrameworkSelect from './framework-select';

export default function UtilCard() {
  const { theme } = useTheme();

  return (
    <Card className='max-w-[400px]'>
      <CardHeader className='justify-center'>
        <Icon
          icon={NextIcon}
          className='mr-2'
          color={theme === 'dark' ? frameworks[2]?.color.dark : frameworks[2]?.color.light}
        />
        Next.js Cross Calculator
      </CardHeader>
      <CardBody className='gap-y-3 pt-0 !pb-6'>
        <div className='flex items-center justify-center gap-4'>
          <Link
            href='https://github.com/kage1020/CrossCalculator'
            target='_blank'
            rel='noopener noreferrer'
            className='w-8 flex justify-center'
          >
            <GithubIcon size={20} />
          </Link>
          <Link
            href='https://twitter.com/kage1020'
            target='_blank'
            rel='noopener noreferrer'
            className='w-8 flex justify-center'
          >
            <XIcon size={20} />
          </Link>
          <ThemeSwitcher />
        </div>
        <FrameworkSelect />
      </CardBody>
    </Card>
  );
}
