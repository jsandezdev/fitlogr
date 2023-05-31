import Link from 'next/link'
import React from 'react'

import { Navigation } from '@/components/Navigation'
import { Toaster } from '@/components/ui/Toaster'

const navLinks = [
  {
    name: 'Login',
    href: '/login'
  },
  {
    name: 'Register',
    href: '/register'
  }
]

export default function AuthLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* <div className='flex flex-row gap-4 border-b justify-center'>
        <Link href='/login' className='p-4'>Login</Link>
        <Link href='/register' className='p-4'>Register</Link>
      </div> */}
      {/* <Navigation navLinks={navLinks} /> */}
      {children}
      <Toaster />
    </>
  )
}
