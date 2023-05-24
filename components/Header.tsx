import Link from 'next/link'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'

import { LogoutButton } from './LogoutButton'

export const Header = async () => {
  const session = await getServerSession(authOptions)

  return (
    <header>
      Logged in as {session?.user?.email}
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/challenge">Challenge</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </nav>
    </header>
  )
}
