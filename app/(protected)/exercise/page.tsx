import { getServerSession } from 'next-auth';

import { EmptyPlaceholder } from '@/components/EmptyPlaceholder';
import { ExerciseItem } from '@/components/ExerciseItem';
import { NewExerciseButton } from '@/components/NewExerciseButton';
import { PageHeader } from '@/components/PageHeader';
import { ProtectedPage } from '@/components/ProtectedPage';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function ExercisesPage() {
  const session = await getServerSession(authOptions);

  if (!session) return new Response('Unauthorized', { status: 401 });

  const exercises = await prisma.exercise.findMany({});

  return (
    <ProtectedPage>
      <PageHeader
        heading="Ejercicios"
        text="Crea y gestiona los ejercicios del sistema."
      >
        <NewExerciseButton />
      </PageHeader>
      <div>
        {exercises?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {exercises.map((exercise) => (
              <ExerciseItem key={exercise.id} exercise={exercise} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="FileText" />
            <EmptyPlaceholder.Title>No hay ejercicios</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Aún no hay ningún ejercicio. Empieza creando uno nuevo.
            </EmptyPlaceholder.Description>
            <NewExerciseButton variant="secondary" />
          </EmptyPlaceholder>
        )}
      </div>
    </ProtectedPage>
  );
}
