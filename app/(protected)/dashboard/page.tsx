import { PageHeader } from '@/components/PageHeader';
import { ProtectedPage } from '@/components/ProtectedPage';

export default async function Dashboard() {
  return (
    <ProtectedPage>
      <PageHeader heading="Inicio" text="¡Bievenido a FitLogr!" />
      <div>
        <p>
          Este es un proyecto en desarrollo, por lo que muchas de las
          funcionalidades no están, o no funcionan correctamente. Si tienes
          alguna duda sobre cómo irá creciendo la aplicación, alguna sugerencia,
          o simplemente quieres mandarme un saludo, no dudes en contactar
          conmigo en{' '}
          <a className="font-bold" href="mailto:jordisandez@gmail.com">
            jordisandez@gmail.com
          </a>
        </p>
      </div>
    </ProtectedPage>
  );
}
