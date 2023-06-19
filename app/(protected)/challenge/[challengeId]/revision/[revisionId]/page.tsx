import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { PageHeader } from '@/components/PageHeader'
import { ProtectedPage } from '@/components/ProtectedPage'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'

import { RevisionForm } from '../components/RevisionForm'

interface Props {
  params: {
    challengeId: string,
    revisionId: string,
  }
}

export default async function Revision ({ params }: Props) {
  const session = await getServerSession(authOptions)

  if (!session) return new Response('Unauthorized', { status: 401 })

  const revision = await prisma.revision.findUnique({
    where: {
      id: params.revisionId
    },
    include: {
      challenge: true
    }
  })

  if (!revision || revision.challengeId !== params.challengeId || revision.challenge.userId !== session.user?.id) {
    notFound()
  }

  return (
    <ProtectedPage>
      <PageHeader heading={`Revisión ${formatDate(revision.date.toDateString())}`} text="Estos son los datos de la revisión" />
      <div>
        <RevisionForm challenge={revision.challenge} revision={revision}/>
      </div>
    </ProtectedPage>
  )
}
