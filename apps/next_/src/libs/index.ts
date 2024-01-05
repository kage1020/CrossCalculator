import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  frameworks as frameworksWithoutIcon,
  Framework as FrameworkWithoutIcon,
} from '@repo/utils';
import {
  AstroIcon,
  GatsbyIcon,
  NuxtIcon,
  ReactIcon,
  RemixIcon,
  SolidIcon,
  SvelteIcon,
  VueIcon,
  IconType,
} from '@repo/ui/ReactIcons';
import { QwikIcon } from '@repo/ui/IconifyIcons';

type Framework = FrameworkWithoutIcon & { icon: IconType };

const icons = [
  AstroIcon,
  GatsbyIcon,
  NuxtIcon,
  QwikIcon,
  ReactIcon,
  RemixIcon,
  SolidIcon,
  SvelteIcon,
  VueIcon,
];

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

export const frameworks: Framework[] = frameworksWithoutIcon
  .filter((f) => f.value !== 'next')
  .map((framework, index) => ({
    ...framework,
    icon: icons[index],
  }));
