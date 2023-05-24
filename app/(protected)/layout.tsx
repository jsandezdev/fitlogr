import React from 'react'

import { Header } from '@/components/Header'

export default function ProtectedLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Header />
      {children}
    </>
  )
}
