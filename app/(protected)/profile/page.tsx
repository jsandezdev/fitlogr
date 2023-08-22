import Image from 'next/image';
import { getServerSession } from 'next-auth';

import { PageHeader } from '@/components/PageHeader';
import { ProtectedPage } from '@/components/ProtectedPage';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authOptions } from '@/lib/auth';

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) return new Response('Unauthorized', { status: 401 });

  return (
    <ProtectedPage>
      <PageHeader heading="Perfil" text="Estos son tus datos personales" />
      <div className="flex items-center justify-center">
        <div className="flex flex-col gap-8 max-w-sm items-center">
          <div>
            {user.image && (
              <Image
                src={user.image || '/images/default.png'}
                className="max-h-[100px] rounded-full"
                alt={`Foto de perfil de ${user.name}`}
                width={100}
                height={100}
                fetchPriority="low"
              />
            )}
          </div>
          <div className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Nombre</Label>
              <Input type="text" name="name" disabled value={user.name || ''} />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="lastName">Apellidos</Label>
              <Input
                type="text"
                name="lastName"
                disabled
                value={user.lastName || ''}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="text"
                name="email"
                disabled
                value={user.email || ''}
              />
            </div>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}
