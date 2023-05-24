
import { getServerSession } from 'next-auth'

import { PageTitle } from '@/components/PageTitle'
import { authOptions } from '@/lib/auth'

export default async function Dashboard () {
  const session = await getServerSession(authOptions)
  console.log(session)

  return (
    <main className="text">
      <PageTitle>Dashboard</PageTitle>
    </main>
  )
}
