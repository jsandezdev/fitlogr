import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { PageHeader } from '@/components/PageHeader';
import { ProtectedPage } from '@/components/ProtectedPage';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

import { ExerciseForm } from '../../new/components/ExerciseForm';

interface Props {
  params: {
    exerciseId: string;
  };
}

export default async function ExerciseDashboardPage({ params }: Props) {
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
    <ProtectedPage>
      <PageHeader heading="Ejercicio" />
      <ExerciseForm exercise={exercise} />
    </ProtectedPage>
  );
}
