import { Exercise } from '@prisma/client';
import Link from 'next/link';

import { Skeleton } from '@/components/ui/skeleton';
import { MuscularGroup, muscularGroups } from '@/lib/config';

import { ExerciseOperations } from './ExerciseOperations';

interface Props {
  exercise: Pick<Exercise, 'id' | 'name' | 'description' | 'muscularGroups'>;
}

export function ExerciseItem({ exercise }: Props) {
  const getMuscularGroupName = (id: MuscularGroup): string => {
    return (
      muscularGroups.find((muscularGroup) => muscularGroup.id === id)?.title ||
      id
    );
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/exercise/${exercise.id}`}
          className="font-semibold hover:underline"
        >
          {exercise.name}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {exercise.muscularGroups
              .map((muscularGroupId) => {
                return getMuscularGroupName(muscularGroupId as MuscularGroup);
              })
              .join(', ')}
          </p>
        </div>
      </div>
      <ExerciseOperations exercise={exercise} />
    </div>
  );
}

ExerciseItem.Skeleton = function ExerciseItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};
