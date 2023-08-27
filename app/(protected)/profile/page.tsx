import { getServerSession } from 'next-auth';

import { PageHeader } from '@/components/PageHeader';
import { ProtectedPage } from '@/components/ProtectedPage';
import { authOptions } from '@/lib/auth';

import { ProfileForm } from './components/ProfileForm';

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) return new Response('Unauthorized', { status: 401 });

  return (
    <ProtectedPage>
      <PageHeader heading="Perfil" text="Estos son tus datos personales" />
      <div className="flex items-center justify-center">
        <ProfileForm user={user} />
      </div>
    </ProtectedPage>
  );
}
