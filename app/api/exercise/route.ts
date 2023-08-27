import { getServerSession } from 'next-auth/next';
import * as z from 'zod';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { newExerciseSchema } from '@/lib/validations/newExercise.schema';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) return new Response('Unauthorized', { status: 401 });

    const exercises = await prisma.exercise.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return new Response(JSON.stringify(exercises));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) return new Response('Unauthorized', { status: 401 });

    const json = await req.json();
    const body = newExerciseSchema.parse(json);

    const exercise = await prisma.exercise.create({
      data: {
        name: body.name,
        description: body.description,
        muscularGroups: body.muscularGroups,
      },
      // select: {
      //   id: true
      // }
    });

    return new Response(JSON.stringify(exercise));
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
