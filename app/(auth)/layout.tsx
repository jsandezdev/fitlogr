import { ReactNode } from 'react';

import { Toaster } from '@/components/ui/Toaster';

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
