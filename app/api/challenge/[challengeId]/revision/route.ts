import { getServerSession } from 'next-auth/next'
import * as z from 'zod'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revisionSchema } from '@/lib/validations/revision.schema'

const routeContextSchema = z.object({
  params: z.object({
    challengeId: z.string()
  })
})

export async function GET (req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) return new Response('Unauthorized', { status: 401 })

    const { params } = routeContextSchema.parse(context)

    const revisions = await prisma.revision.findMany({
      select: {
        id: true,
        date: true
      },
      where: {
        challenge:
        {
          id: params.challengeId,
          user: {
            id: session.user?.id
          }
        }
      }
    })

    return new Response(JSON.stringify(revisions))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST (req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) return new Response('Unauthorized', { status: 401 })

    const { params } = routeContextSchema.parse(context)

    console.log(params)

    const json = await req.json()
    const body = revisionSchema.parse(json)

    const data = {
      date: body.date,
      challengeId: params.challengeId,
      weight: body.weight,
      frontPhoto: body.frontPhoto,
      sidePhoto: body.sidePhoto,
      backPhoto: body.backPhoto,
      measurements: body.measurements,
      createdAt: body.createdAt,
      updatedAt: body.updatedAt
    }

    console.log(data)

    const revision = await prisma.revision.create({
      data
    })

    return new Response(JSON.stringify(revision))
  } catch (error) {
    // console.log(error)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
