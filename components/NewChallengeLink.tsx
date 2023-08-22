import { Plus } from 'lucide-react';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';

interface Props {
  variant?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost';
}

export const NewChallengeLink = ({ variant = 'default', ...props }: Props) => {
  return (
    <Link
      className={buttonVariants({ variant })}
      href="/challenge/new"
      {...props}
    >
      <Plus className="mr-2 h-4 w-4" />
      Nuevo reto
    </Link>
  );
};
