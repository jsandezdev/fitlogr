'use client';

import { CalendarCheck, Settings, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

interface Props {
  challengeId: string;
}

export function ChallengeNav({ challengeId }: Props) {
  const path = usePathname();

  const items = [
    {
      title: 'Revisiones',
      href: `/challenge/${challengeId}/revision`,
      icon: CalendarCheck,
      disabled: false,
    },
    {
      title: 'Progreso',
      href: `/challenge/${challengeId}/progress`,
      icon: TrendingUp,

      disabled: true,
    },
    {
      title: 'Configuración',
      href: `/challenge/${challengeId}/settings`,
      icon: Settings,
      disabled: false,
    },
  ];

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="flex flex-row justify-between">
      {items.map((item, index) => {
        return (
          item.href && (
            <Link key={index} href={item.disabled ? '/' : item.href}>
              <span
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                  path === item.href ? 'bg-accent' : 'transparent',
                  item.disabled && 'cursor-not-allowed opacity-80',
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}
