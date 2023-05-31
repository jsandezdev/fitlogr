// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'
import { Navigation } from './Navigation'

const navLinks = [
  {
    name: 'Inicio',
    href: '/dashboard'
  },
  {
    name: 'Retos',
    href: '/challenge'
  },
  {
    name: 'Perfil',
    href: '/profile'
  }
]

export const Header = async () => {
  // const session = await getServerSession(authOptions)

  return (
    <header>
      {/* <p className='bg-blue-800 text-white text-center p-2'>Logged in as {session?.user?.email}</p> */}
      <Navigation navLinks={navLinks} />
    </header>
  )
}
