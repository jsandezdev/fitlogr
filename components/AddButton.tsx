'use client';

import { Plus } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button, ButtonProps, buttonVariants } from './ui/button';

interface Props extends ButtonProps {}

export const AddButton = ({
  className,
  onClick,
  variant,
  disabled,
  ...props
}: Props) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant }),
        {
          'cursor-not-allowed opacity-60': disabled,
        },
        className,
      )}
      disabled={disabled}
      {...props}
    >
      <Plus className="mr-2 h-4 w-4" />
      Nuevo reto
    </Button>
  );
};
