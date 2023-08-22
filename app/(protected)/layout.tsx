import React from 'react';

import { Header } from '@/components/Header';
import { Toaster } from '@/components/ui/Toaster';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex min-h-screen flex-col space-y-6">
        {/* @ts-expect-error Server Component */}
        <Header />
        <div className="container">{children}</div>
      </main>
      <Toaster />
    </>
  );
}
