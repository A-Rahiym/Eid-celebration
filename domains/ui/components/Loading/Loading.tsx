'use client';

import InitialLoader from '@/domains/ui/components/system/loader/InitialLoader';

interface LoadingProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  fullHeight?: boolean;
  className?: string;
}

export default function Loading({
  label = 'Celebrating together ✨',
  size = 'md',
  fullHeight = false,
  className,
}: LoadingProps) {
  return <InitialLoader label={label} size={size} fullHeight={fullHeight} className={className} />;
}
