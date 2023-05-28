import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { PageTitle } from '@/components/PageTitle'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface Props {
  params: {
    challengeId: string
  }
}

export default async function Progress ({ params }: Props) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  const challenge = await prisma.challenge.findUnique({
    where: {
      id: params.challengeId
    }
  })

  if (!challenge || challenge.userId !== session.user.id) {
    notFound()
  }

  return (
    <>
      <PageTitle>Progress</PageTitle>
    </>
  )
}
