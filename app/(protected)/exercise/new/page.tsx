import { PageTitle } from '@/components/PageTitle';

import { ExerciseForm } from './components/ExerciseForm';

export default async function NewExercise() {
  return (
    <>
      <div className="max-w-screen-sm mx-auto">
        <PageTitle>Nuevo ejercicio</PageTitle>
        <ExerciseForm />
      </div>
    </>
  );
}
