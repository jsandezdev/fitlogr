import { notFound, redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

// import { PageHeader } from '@/components/PageHeader'
// import { PageTitle } from '@/components/PageTitle'
// import { ProtectedPage } from '@/components/ProtectedPage'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface Props {
  params: {
    challengeId: string
  }
}

export default async function Dashboard ({ params }: Props) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  const challenge = await prisma.challenge.findUnique({
    where: {
      id: params.challengeId
    }
  })

  if (!challenge || challenge.userId !== session.user?.id) {
    notFound()
  }

  redirect(`/challenge/${params.challengeId}/revision`)

  // return (
  //   <ProtectedPage>
  //     <PageHeader heading="Panel de control" />
  //     <div>

  //     </div>
  //   </ProtectedPage>
  // )
}
