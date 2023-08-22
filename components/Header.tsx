import { getServerSession } from 'next-auth';

import { MainNav } from '@/components/MainNav';
import { UserAccountNav } from '@/components/UserAccountNav';
import { authOptions } from '@/lib/auth';

const navLinks = [
  {
    title: 'Inicio',
    href: '/dashboard',
  },
  {
    title: 'Retos',
    href: '/challenge',
  },
];

export const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <MainNav items={navLinks} />
        <UserAccountNav
          user={{
            name: session?.user?.name,
            image: session?.user?.image,
            email: session?.user?.email,
          }}
        />
      </div>
    </header>
  );
};
