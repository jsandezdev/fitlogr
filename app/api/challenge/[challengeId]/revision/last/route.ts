import { getServerSession } from 'next-auth/next';
import * as z from 'zod';

import { authOptions } from '@/lib/auth';
import { currentUserHasAccessToChallenge } from '@/lib/challenge';
import { prisma } from '@/lib/prisma';

const routeContextSchema = z.object({
  params: z.object({
    challengeId: z.string(),
  }),
});

export async function GET(
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

    const revision = await prisma.revision.findFirst({
      // select: {
      //   id: true,
      //   date: true
      // },
      where: {
        challenge: {
          id: params.challengeId,
          user: {
            id: session.user?.id,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    return new Response(JSON.stringify(revision));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
