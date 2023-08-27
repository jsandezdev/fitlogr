'use client';

import {
  BookIcon,
  DumbbellIcon,
  HomeIcon,
  TrophyIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import * as React from 'react';

import { cn } from '@/lib/utils';

const links = [
  {
    title: 'Retos',
    href: '/challenge',
    icon: <TrophyIcon />,
  },
  {
    title: 'Ejercicios',
    href: '/exercise',
    icon: <DumbbellIcon />,
  },
  {
    title: 'Inicio',
    href: '/dashboard',
    icon: <HomeIcon />,
  },
  {
    title: 'Entrenamientos',
    href: '/workout',
    icon: <BookIcon />,
  },
  {
    title: 'Perfil',
    href: '/profile',
    icon: <UserIcon />,
  },
];

export function MainNav() {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="max-w-md mx-auto absolute bottom-6 left-0 right-0 p-2 flex bg-primary/75 rounded-full justify-between">
      {links?.length ? (
        <>
          {links?.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={cn(
                'p-3 rounded-full border-2 border-primary/75 flex items-center text-lg font-medium transition-colors hover:bg-primary/75 text-secondary',
                link.href.startsWith(`/${segment}`)
                  ? 'border-2 border-primary bg-primary text-secondary'
                  : 'border-transparent',
              )}
            >
              {link.icon}
            </Link>
          ))}
        </>
      ) : null}
    </nav>
  );
}
