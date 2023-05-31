'use client'

import { signOut } from 'next-auth/react'

export const LogoutButton = ({ className, ...props }) => {
  return (
    <button
      className={className}
      type='button'
      onClick={() => signOut()}
    >
      Cerrar sesión
    </button>
  )
}
