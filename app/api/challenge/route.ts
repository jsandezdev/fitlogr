import { getServerSession } from 'next-auth/next'
import * as z from 'zod'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { challengeSchema } from '@/lib/validations/challenge.schema'

// const challengeCreateSchema = z.object({
//   title: z.string(),
//   content: z.string().optional()
// })

export async function GET () {
  try {
    const session = await getServerSession(authOptions)
    console.log('🚀 ~ file: route.ts:16 ~ GET ~ session:', session)

    if (!session) {
      return new Response('Unauthorized', { status: 403 })
    }

    const challenges = await prisma.challenge.findMany({

      // select: {
      //   id: true,
      //   name: true
      // },
      // where: {
      //   userId: session.user.id
      // }
    })

    // console.log(challenges)

    return new Response(JSON.stringify(challenges))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST (req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response('Unauthorized', { status: 403 })
    }

    const json = await req.json()
    const body = challengeSchema.parse(json)

    const challenge = await prisma.challenge.create({
      data: {
        name: body.name,
        startDate: body.startDate,
        endDate: body.endDate,
        revisionFrequencyNumber: body.revisionFrequencyNumber,
        revisionFrequencyUnitOfTime: body.revisionFrequencyUnitOfTime,
        includeRevisionBodyPhotos: body.includeRevisionBodyPhotos,
        includeRevisionBodyWeight: body.includeRevisionBodyWeight,
        includeRevisionBodyMeasurements: body.includeRevisionBodyMeasurements,
        includeDietLog: body.includeDietLog,
        monthlyCheatMeals: body.monthlyCheatMeals,
        includeWeightGoal: body.includeWeightGoal,
        includeMeasurementGoals: body.includeMeasurementGoals,
        weightGoal: body.weightGoal,
        measurementGoals: body.measurementGoals,
        weeklyTrainingDays: body.weeklyTrainingDays,
        createdAt: body.createdAt,
        updatedAt: body.updatedAt,
        userId: session.user.id
      },
      select: {
        id: true
      }
    })

    return new Response(JSON.stringify(challenge))
  } catch (error) {
    console.log(error)

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
