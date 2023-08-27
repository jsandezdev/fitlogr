import React from 'react';

import { MainNav } from '@/components/MainNav';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/Toaster';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <main className="flex min-h-screen flex-col space-y-6">
          <div className="container my-7">{children}</div>
          <MainNav />
        </main>
      </ThemeProvider>
      <Toaster />
    </>
  );
}
