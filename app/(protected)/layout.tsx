import React from 'react'

import { Header } from '@/components/Header'
import { Toaster } from '@/components/ui/Toaster'

export default function ProtectedLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main>
        {/* @ts-expect-error Server Component */}
        <Header />
        <div className='max-w-screen-xl mx-auto p-4'>
          {children}
        </div>
      </main>
      <Toaster />
    </>
  )
}
