'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type Props = {
  user: any;
};

export const ProfileForm = ({ user }: Props) => {
  const [mounted, setMounted] = useState(false);
  const { setTheme: setMode, resolvedTheme: mode } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col gap-8 max-w-sm items-center">
      <div>
        {user.image && (
          <Image
            src={user.image || '/images/default.png'}
            className="max-h-[100px] rounded-full"
            alt={`Foto de perfil de ${user.name}`}
            width={100}
            height={100}
            fetchPriority="low"
          />
        )}
      </div>
      <div className="space-y-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Nombre</Label>
          <Input type="text" name="name" disabled value={user.name || ''} />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="lastName">Apellidos</Label>
          <Input
            type="text"
            name="lastName"
            disabled
            value={user.lastName || ''}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="text" name="email" disabled value={user.email || ''} />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Mode</Label>
          <div className="grid grid-cols-3 gap-2">
            {mounted ? (
              <>
                <Button
                  variant={'outline'}
                  size="sm"
                  onClick={() => setMode('light')}
                  className={cn(mode === 'light' && 'border-2 border-primary')}
                >
                  <SunIcon className="mr-1 -translate-x-1" />
                  Light
                </Button>
                <Button
                  variant={'outline'}
                  size="sm"
                  onClick={() => setMode('dark')}
                  className={cn(mode === 'dark' && 'border-2 border-primary')}
                >
                  <MoonIcon className="mr-1 -translate-x-1" />
                  Dark
                </Button>
              </>
            ) : (
              <>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
