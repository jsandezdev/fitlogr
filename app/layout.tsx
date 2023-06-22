import './globals.css'

import { Inter, Roboto_Flex as RobotoFlex } from 'next/font/google'
import React from 'react'

import { cn } from '@/lib/utils'

import { NextAuthProvider } from './providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
})

const roboto = RobotoFlex({
  subsets: ['latin'],
  variable: '--font-heading'
})

export const metadata = {
  title: 'FitLogr',
  description: 'Tu app de retos fitness'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
          roboto.variable
        )}
      >
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
