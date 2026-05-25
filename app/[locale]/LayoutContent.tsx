'use client';

import Navbar from '@/domains/ui/components/Navbar/Navbar';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
