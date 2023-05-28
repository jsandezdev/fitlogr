import { getServerSession } from 'next-auth/next'
import * as z from 'zod'

import { authOptions } from '@/lib/auth'
import { ChallengeStatus } from '@/lib/config'
import { prisma } from '@/lib/prisma'
import { challengeSchema } from '@/lib/validations/challenge.schema'

export async function GET () {
  try {
    const session = await getServerSession(authOptions)

    if (!session) return new Response('Unauthorized', { status: 401 })

    const challenges = await prisma.challenge.findMany({
      select: {
        id: true,
        name: true
      },
      where: {
        userId: session.user.id
      }
    })

    return new Response(JSON.stringify(challenges))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST (req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) return new Response('Unauthorized', { status: 401 })

    const json = await req.json()
    const body = challengeSchema.parse(json)

    const challenge = await prisma.challenge.create({
      data: {
        name: body.name,
        status: ChallengeStatus.Active,
        startDate: body.startDate,
        endDate: body.endDate,
        revisionFrequencyNumber: body.revisionFrequencyNumber,
        revisionFrequencyUnitOfTime: body.revisionFrequencyUnitOfTime,
        includeRevisionBodyPhotos: body.includeRevisionBodyPhotos,
        includeRevisionBodyWeight: body.includeRevisionBodyWeight,
        includeRevisionBodyParts: body.includeRevisionBodyParts,
        includeDietLog: body.includeDietLog,
        monthlyCheatMeals: body.monthlyCheatMeals,
        includeWeightGoal: body.includeWeightGoal,
        includeBodyPartGoals: body.includeBodyPartGoals,
        weightGoal: body.weightGoal,
        bodyPartGoals: body.bodyPartGoals,
        weeklyTrainingDays: body.weeklyTrainingDays,
        createdAt: body.createdAt,
        updatedAt: body.updatedAt,
        userId: session.user.id
      }
      // select: {
      //   id: true
      // }
    })

    return new Response(JSON.stringify(challenge))
  } catch (error) {
    // console.log(error)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
