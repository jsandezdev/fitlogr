import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { authOptions } from '@/lib/auth';
import {
  checkChallengeHasRevision,
  currentUserHasAccessToChallenge,
} from '@/lib/challenge';
import { prisma } from '@/lib/prisma';
import { revisionSchema } from '@/lib/validations/revision.schema';

const routeContextSchema = z.object({
  params: z.object({
    challengeId: z.string(),
    revisionId: z.string(),
  }),
});

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) return new Response('Unauthorized', { status: 401 });

    const { params } = routeContextSchema.parse(context);

    if (!(await currentUserHasAccessToChallenge(params.challengeId))) {
      return new Response(null, { status: 403 });
    }

    if (
      !(await checkChallengeHasRevision(params.challengeId, params.revisionId))
    ) {
      return new Response(null, { status: 404 });
    }

    await prisma.revision.delete({
      where: {
        id: params.revisionId as string,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) return new Response('Unauthorized', { status: 401 });

    const { params } = routeContextSchema.parse(context);

    if (!(await currentUserHasAccessToChallenge(params.challengeId))) {
      return new Response(null, { status: 403 });
    }

    if (
      !(await checkChallengeHasRevision(params.challengeId, params.revisionId))
    ) {
      return new Response(null, { status: 404 });
    }

    const json = await req.json();
    const body = revisionSchema.parse(json);

    await prisma.revision.update({
      where: {
        id: params.revisionId,
      },
      data: {
        date: body.date,
        bodyWeight: body.bodyWeight,
        frontPhoto: body.frontPhoto,
        sidePhoto: body.sidePhoto,
        backPhoto: body.backPhoto,
        bodyPartMeasurements: body.bodyPartMeasurements,
        updatedAt: new Date(),
      },
      select: {
        id: true,
      },
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
