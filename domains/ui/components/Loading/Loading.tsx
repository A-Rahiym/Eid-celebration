'use client';

import { useTranslations } from 'next-intl';
import InitialLoader from '@/domains/ui/components/system/loader/InitialLoader';

interface LoadingProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  fullHeight?: boolean;
  className?: string;
}

export default function Loading({
  label,
  size = 'md',
  fullHeight = false,
  className,
}: LoadingProps) {
  const t = useTranslations('loading');

  return (
    <InitialLoader
      label={label ?? t('label')}
      size={size}
      fullHeight={fullHeight}
      className={className}
    />
  );
}
