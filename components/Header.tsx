import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'

import { Navigation } from './Navigation'

const navLinks = [
  {
    name: 'Dashboard',
    href: '/dashboard'
  },
  {
    name: 'Challenge',
    href: '/challenge'
  },
  {
    name: 'Profile',
    href: '/profile'
  }
]

export const Header = async () => {
  const session = await getServerSession(authOptions)

  return (
    <header>
      <p className='bg-gray-800 text-white text-center p-2'>Logged in as {session?.user?.email}</p>
      <Navigation navLinks={navLinks} />
    </header>
  )
}
