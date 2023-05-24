'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { LogoutButton } from './LogoutButton'

export const Navigation = ({ navLinks }) => {
  const pathname = usePathname()

  return (
    <nav className='flex flex-row justify-start gap-2 align-middle border-b max-w-screen-xl mx-auto'>
      {navLinks.map((link) => {
        const isActive = pathname.startsWith(link.href)

        return (
          <Link
            className={'p-4 ' + (isActive ? 'font-bold' : '')}
            href={link.href}
            key={link.name}
          >
            {link.name}
          </Link>
        )
      })}
      <LogoutButton className='p-4' />
    </nav>
  )
}
