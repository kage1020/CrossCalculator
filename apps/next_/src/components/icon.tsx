'use client';

import { useEffect, useState } from 'react';
import { IconType } from '@repo/ui/ReactIcons';
import { LoadingIcon } from '@repo/ui/IconifyIcons';

export default function Icon({
  className,
  icon,
  color,
  size,
}: {
  className?: string;
  icon: IconType;
  color?: string;
  size?: number;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <LoadingIcon duration='1s' className={className} />;

  return icon({ className, color, size });
}
