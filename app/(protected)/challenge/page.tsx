import { getServerSession } from 'next-auth'

import { ChallengeItem } from '@/components/ChallengeItem'
import { EmptyPlaceholder } from '@/components/EmptyPlaceholder'
import { NewChallengeButton } from '@/components/NewChallengeButton'
import { PageHeader } from '@/components/PageHeader'
import { ProtectedPage } from '@/components/ProtectedPage'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function ChallengePage () {
  const session = await getServerSession(authOptions)

  if (!session) return new Response('Unauthorized', { status: 401 })

  const challenges = await prisma.challenge.findMany({
    where: {
      userId: session?.user?.id
    }
  })

  return (
    <ProtectedPage>
      <PageHeader heading="Retos" text="Crea y gestiona tus retos.">
        <NewChallengeButton />
      </PageHeader>
      <div>
        {challenges?.length
          ? (
            <div className="divide-y divide-border rounded-md border">
              {challenges.map((challenge) => (
                <ChallengeItem key={challenge.id} challenge={challenge} />
              ))}
            </div>
          )
          : (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="FileText" />
              <EmptyPlaceholder.Title>No hay retos</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
              Aún no tienes ningún reto. Empieza creando uno nuevo.
              </EmptyPlaceholder.Description>
              <NewChallengeButton variant='secondary' />
            </EmptyPlaceholder>
          )}
      </div>
    </ProtectedPage>
  )
}
