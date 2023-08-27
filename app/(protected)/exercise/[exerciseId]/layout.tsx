import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import React from 'react';

import { Separator } from '@/components/ui/separator';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

import { ExerciseNav } from './components/ExerciseNav';

interface Props {
  params: {
    exerciseId: string;
  };
  children: React.ReactNode;
}

export default async function ExerciseLayout({ params, children }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const exercise = await prisma.exercise.findUnique({
    where: {
      id: params.exerciseId,
    },
  });

  if (!exercise) notFound();

  return (
    <>
      <span className="pb-4 text-2xl md:text-3xl font-bold">
        {exercise.name}
      </span>
      <Separator className="mt-4 mb-6" />
      <div className="grid flex-1 md:grid-cols-[200px_1fr]">
        <aside className="w-full sm:w-[200px] flex-col md:flex">
          <ExerciseNav exerciseId={params.exerciseId} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </>
  );
}
