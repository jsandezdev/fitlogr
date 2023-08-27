import { Workout } from '@prisma/client';
import Link from 'next/link';

import { Skeleton } from '@/components/ui/skeleton';
// import { WorkoutOperations } from '@/components/WorkoutOperations';
import { formatDate } from '@/lib/utils';

interface Props {
  workout: Pick<Workout, 'id' | 'date'>;
}

export function WorkoutItem({ workout }: Props) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/workout/${workout.id}`}
          className="font-semibold hover:underline"
        >
          {formatDate(workout.date.toDateString())}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(workout.date.toDateString())}
          </p>
        </div>
      </div>
      {/* <WorkoutOperations workout={{ id: workout.id, date: workout.date }} /> */}
    </div>
  );
}

WorkoutItem.Skeleton = function WorkoutItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};
