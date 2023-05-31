'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function MainNav ({
  challengeId,
  ...props
}) {
  const pathname = usePathname()
  const navLinks = [
    {
      name: 'Panel de control',
      href: `/challenge/${challengeId}/dashboard`
    },
    {
      name: 'Revisiones',
      href: `/challenge/${challengeId}/revision`
    },
    {
      name: 'Progreso',
      href: `/challenge/${challengeId}/progress`
    },
    {
      name: 'Configuración',
      href: `/challenge/${challengeId}/settings`
    }
  ]

  return (
    <nav
      className='flex items-center space-x-4 lg:space-x-6'
      {...props}
    >
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
    </nav>
  )
}
