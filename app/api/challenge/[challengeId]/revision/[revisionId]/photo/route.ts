import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { authOptions } from '@/lib/auth';
import {
  checkChallengeHasRevision,
  currentUserHasAccessToChallenge,
} from '@/lib/challenge';
import { PhotoType } from '@/lib/config';
import { prisma } from '@/lib/prisma';

const routeContextSchema = z.object({
  params: z.object({
    challengeId: z.string(),
    revisionId: z.string(),
  }),
});

const photoSchema = z.object({
  type: z.nativeEnum(PhotoType),
  url: z.string(),
});

export async function POST(
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

    // @TODO: Antes de subir la foto, comprobar si ya tiene una, y eliminarla

    const json = await req.json();
    const body = photoSchema.parse(json);

    await prisma.revision.update({
      where: {
        id: params.revisionId,
      },
      data: {
        [body.type + 'Photo']: body.url,
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
