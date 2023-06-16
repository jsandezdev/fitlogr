'use client'

import { CalendarCheck, GaugeIcon, Settings, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

interface Props {
  challengeName: string
  challengeId: string
}

export function ChallengeNav ({ challengeId, challengeName }: Props) {
  const path = usePathname()

  const items = [
    {
      title: 'Panel de control',
      href: `/challenge/${challengeId}/dashboard`,
      icon: GaugeIcon,
      disabled: true
    },
    {
      title: 'Revisiones',
      href: `/challenge/${challengeId}/revision`,
      icon: CalendarCheck,
      disabled: false
    },
    {
      title: 'Progreso',
      href: `/challenge/${challengeId}/progress`,
      icon: TrendingUp,

      disabled: true
    },
    {
      title: 'Configuración',
      href: `/challenge/${challengeId}/settings`,
      icon: Settings,
      disabled: false
    }
  ]

  if (!items?.length) {
    return null
  }

  return (
    <nav className="grid items-start gap-2">
      <span className='px-3 pb-4 text-2xl font-bold'>
        {challengeName}
      </span>
      {items.map((item, index) => {
        return (
          item.href && (
            <Link key={index} href={item.disabled ? '/' : item.href}>
              <span
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                  path === item.href ? 'bg-accent' : 'transparent',
                  item.disabled && 'cursor-not-allowed opacity-80'
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        )
      })}
    </nav>
  )
}
