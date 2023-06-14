import { getServerSession } from 'next-auth'
import { z } from 'zod'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const routeContextSchema = z.object({
  params: z.object({
    challengeId: z.string()
  })
})

// @TODO
export async function GET () {

}

// @TODO
export async function POST (req: Request) {

}

// @TODO
export async function PUT (req: Request) {

}

export async function DELETE (
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
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
