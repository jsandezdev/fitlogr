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
