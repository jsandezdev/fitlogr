'use client'

import { signOut } from 'next-auth/react'

export const LogoutButton = () => {
  return (
    <button
      type='button'
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  )
}
