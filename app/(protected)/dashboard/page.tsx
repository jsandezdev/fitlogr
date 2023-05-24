
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'

export default async function Dashboard () {
  const session = await getServerSession(authOptions)
  console.log(session)

  return (
    <main className="text">
      <div>
        <h1 className='text-2xl'>Dashboard</h1>
      </div>
    </main>
  )
}
