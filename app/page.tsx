import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  } else {
    redirect('/dashboard');
  }

  if (!session) {
    return (
      <main>
        <h1>Homepage</h1>
        <p>You should be redirected to login or dashboard</p>
      </main>
    );
  }
}
