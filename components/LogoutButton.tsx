'use client';

import { signOut } from 'next-auth/react';

type Props = {
  className: string;
};

export const LogoutButton = ({ className }: Props) => {
  return (
    <button className={className} type="button" onClick={() => signOut()}>
      Cerrar sesión
    </button>
  );
};
