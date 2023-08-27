'use client';

import { Loader2, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button, ButtonProps, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props extends ButtonProps {
  to: string;
  label: string;
}

export const NewButton = ({
  to,
  label,
  className,
  variant,
  ...props
}: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnClick = () => {
    setIsLoading(true);
    router.push(to);
  };

  return (
    <Button
      onClick={handleOnClick}
      className={cn(
        buttonVariants({ variant }),
        { 'cursor-not-allowed opacity-60': isLoading },
        'flex text-md font-medium',
        className,
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="animate-spin mr-2" />
      ) : (
        <Plus className="mr-2" />
      )}
      Añadir {label}
    </Button>
  );
};
