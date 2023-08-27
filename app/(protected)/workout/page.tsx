import { getServerSession } from 'next-auth';

import { EmptyPlaceholder } from '@/components/EmptyPlaceholder';
import { NewWorkoutButton } from '@/components/NewWorkoutButton';
import { PageHeader } from '@/components/PageHeader';
import { ProtectedPage } from '@/components/ProtectedPage';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function WorkoutPage() {
  const session = await getServerSession(authOptions);

  if (!session) return new Response('Unauthorized', { status: 401 });

  const workouts = await prisma.workout.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return (
    <ProtectedPage>
      <PageHeader
        heading="Entrenamientos"
        text="Crea y gestiona tus entrenamientos."
      >
        <NewWorkoutButton />
      </PageHeader>
      <div>
        {workouts?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {workouts.map((workout) => (
              <WorkoutItem key={workout.id} workout={workout} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="FileText" />
            <EmptyPlaceholder.Title>
              No hay entrenamientos
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Aún no has creado ningún entrenamiento. Empieza creando uno nuevo.
            </EmptyPlaceholder.Description>
            <NewWorkoutButton variant="secondary" />
          </EmptyPlaceholder>
        )}
      </div>
    </ProtectedPage>
  );
}
