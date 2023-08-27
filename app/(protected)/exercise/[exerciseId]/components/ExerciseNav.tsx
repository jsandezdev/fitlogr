'use client';

import { EditIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

interface Props {
  exerciseId: string;
}

export function ExerciseNav({ exerciseId }: Props) {
  const path = usePathname();

  const items = [
    {
      title: 'Ejercicio',
      href: `/exercise/${exerciseId}/edit`,
      icon: EditIcon,
      disabled: false,
    },
  ];

  if (!items?.length || items.length === 1) return null;

  return (
    <nav className="flex flex-col sm:flex-row md:flex-col justify-between">
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
