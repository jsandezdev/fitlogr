import { getServerSession } from 'next-auth';

import { EmptyPlaceholder } from '@/components/EmptyPlaceholder';
import { NewButton } from '@/components/NewButton';
import { NewRevisionButton } from '@/components/NewRevisionButton';
import { PageHeader } from '@/components/PageHeader';
import { ProtectedPage } from '@/components/ProtectedPage';
import { RevisionItem } from '@/components/RevisionItem';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface Props {
  params: {
    challengeId: string;
  };
}

export default async function Revision({ params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) return new Response('Unauthorized', { status: 401 });

  const revisions = await prisma.revision.findMany({
    where: {
      challengeId: params.challengeId,
    },
    orderBy: {
      date: 'desc',
    },
  });

  return (
    <ProtectedPage>
      <PageHeader
        heading="Revisiones"
        text="Consulta y añade tus revisiones."
      />
      <div>
        {revisions?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {revisions.map((revision) => (
              <RevisionItem key={revision.id} revision={revision} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="FileText" />
            <EmptyPlaceholder.Title>No hay revisiones</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Aún no tienes ninguna revisión. Empieza creando una nueva.
            </EmptyPlaceholder.Description>
            <NewRevisionButton
              challengeId={params.challengeId}
              variant="secondary"
            />
          </EmptyPlaceholder>
        )}
      </div>
      <NewButton
        label="revisión"
        to={`/challenge/${params.challengeId}/revision/new`}
      />
    </ProtectedPage>
  );
}
