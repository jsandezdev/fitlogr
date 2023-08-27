import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { authOptions } from '@/lib/auth';
import { MuscularGroup } from '@/lib/config';
import { prisma } from '@/lib/prisma';

const routeContextSchema = z.object({
  params: z.object({
    exerciseId: z.string(),
  }),
});

const exerciseUpdateSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  video: z.string().url().optional().or(z.literal('')),
  muscularGroups: z.array(z.nativeEnum(MuscularGroup)),
});

// @TODO
export async function GET() {}

export async function PUT(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) return new Response('Unauthorized', { status: 403 });

    const json = await req.json();
    const body = exerciseUpdateSchema.parse(json);

    const { params } = routeContextSchema.parse(context);

    const existingExercise = await prisma.exercise.findUnique({
      where: {
        id: params.exerciseId as string,
      },
    });

    if (!existingExercise)
      return new Response(`Exercise with id "${params.exerciseId}" not found`, {
        status: 404,
      });

    const exercise = await prisma.exercise.update({
      where: {
        id: params.exerciseId as string,
      },
      data: {
        ...body,
      },
    });

    return new Response(JSON.stringify(exercise));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) return new Response('Unauthorized', { status: 403 });

    const { params } = routeContextSchema.parse(context);

    const existingExercise = await prisma.exercise.findUnique({
      where: {
        id: params.exerciseId as string,
      },
    });

    if (!existingExercise)
      return new Response(`Exercise with id "${params.exerciseId}" not found`, {
        status: 404,
      });

    await prisma.exercise.delete({
      where: {
        id: params.exerciseId as string,
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
