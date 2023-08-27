import { redirect } from 'next/navigation';

interface Props {
  params: {
    exerciseId: string;
  };
}

export default async function ExercisePage({ params }: Props) {
  redirect(`/exercise/${params.exerciseId}/edit`);
}
