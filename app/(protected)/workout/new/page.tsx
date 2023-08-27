import { PageTitle } from '@/components/PageTitle';

import { NewWorkoutForm } from './components/NewWorkoutForm';

export default async function NewWorkout() {
  return (
    <>
      <div className="max-w-screen-sm mx-auto">
        <PageTitle>Nuevo entrenamiento</PageTitle>
        <NewWorkoutForm />
      </div>
    </>
  );
}
