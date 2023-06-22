import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { PageHeader } from '@/components/PageHeader'
import { ProtectedPage } from '@/components/ProtectedPage'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

import { RevisionForm } from '../components/RevisionForm'

type Props = {
  params: {
    challengeId: string
  }
}

export default async function NewRevision ({ params } : Props) {
  const session = await getServerSession(authOptions)

  if (!session) return new Response('Unauthorized', { status: 401 })

  const challenge = await prisma.challenge.findUnique({
    where: {
      id: params.challengeId
    }
  })

  if (!challenge || challenge.userId !== session.user?.id) {
    notFound()
  }

  // @TODO: Crear la revisión nada más entrar para poder subir las fotos

  return (
    <ProtectedPage>
      <PageHeader heading="Nueva revisión" text="Introduce a continuación los datos de la revisión" />
      <div>
        <RevisionForm challenge={challenge}/>
      </div>
    </ProtectedPage>
  )
}
