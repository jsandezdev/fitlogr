import { getServerSession } from 'next-auth'

import { authOptions } from './auth'
import { prisma } from './prisma'

export async function currentUserHasAccessToChallenge (challengeId: string) {
  const session = await getServerSession(authOptions)
  const count = await prisma.challenge.count({
    where: {
      id: challengeId,
      userId: session?.user?.id
    }
  })

  return count > 0
}

export const checkChallengeHasRevision = async (challengeId: string, revisionId: string) => {
  const challenge = await prisma.challenge.findUnique({
    where: {
      id: challengeId
    },
    select: {
      revisions: {
        select: {
          id: true
        }
      }
    }
  })

  return challenge && challenge.revisions.filter((revision) => revision.id === revisionId).length > 0
}
