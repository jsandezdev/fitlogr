import { getServerSession } from 'next-auth'
import { z } from 'zod'

import { authOptions } from '@/lib/auth'
import { ChallengeStatus } from '@/lib/config'
import { prisma } from '@/lib/prisma'
import { bodyPartGoalSchema } from '@/lib/validations/bodyPartGoal.schema'
import { revisionFrequencySchema } from '@/lib/validations/revisionFrequency.schema'
import { unitOfTimeSchema } from '@/lib/validations/unitOfTime.schema'
import { weekDaySchema } from '@/lib/validations/weekDay.schema'
import { weightGoalSchema } from '@/lib/validations/weightGoal.schema'

const routeContextSchema = z.object({
  params: z.object({
    challengeId: z.string()
  })
})

const challengeCreateSchema = z.object({
  name: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  revisionFrequencyNumber: z.number(),
  revisionFrequencyUnitOfTime: unitOfTimeSchema,
  revisionFrequency: revisionFrequencySchema,
  includeRevisionBodyPhotos: z.boolean(),
  includeRevisionBodyWeight: z.boolean(),
  includeRevisionBodyParts: z.boolean(),
  includeDietLog: z.boolean(),
  monthlyCheatMeals: z.number().nullable(),
  includeWeightGoal: z.boolean(),
  includeBodyPartGoals: z.boolean(),
  weightGoal: weightGoalSchema.nullable(),
  bodyPartGoals: bodyPartGoalSchema.array(),
  weeklyTrainingDays: weekDaySchema.array()
})

// @TODO
export async function GET () {

}

export async function POST (req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) return new Response('Unauthorized', { status: 403 })

    const { params } = routeContextSchema.parse(context)

    if (!(await currentUserHasAccessToChallenge(params.challengeId))) {
      return new Response(null, { status: 403 })
    }

    const json = await req.json()
    const body = challengeCreateSchema.parse(json)

    const challenge = await prisma.challenge.create({
      data: {
        ...body,
        status: ChallengeStatus.Active,
        userId: session.user?.id
      },
      select: {
        id: true
      }
    })

    return new Response(JSON.stringify(challenge))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

// @TODO
export async function PUT (req: Request) {

}

export async function DELETE (req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) return new Response('Unauthorized', { status: 403 })

    const { params } = routeContextSchema.parse(context)

    if (!(await currentUserHasAccessToChallenge(params.challengeId))) {
      return new Response(null, { status: 403 })
    }

    await prisma.challenge.delete({
      where: {
        id: params.challengeId as string
      }
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

async function currentUserHasAccessToChallenge (challengeId: string) {
  const session = await getServerSession(authOptions)
  const count = await prisma.challenge.count({
    where: {
      id: challengeId,
      userId: session?.user?.id
    }
  })

  return count > 0
}
