import { Challenge } from '@prisma/client'
import Link from 'next/link'

import { ChallengeOperations } from '@/components/ChallengeOperations'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDate } from '@/lib/utils'

interface Props {
  challenge: Pick<Challenge, 'id' | 'name' | 'startDate' | 'endDate'>
}

export function ChallengeItem ({ challenge }: Props) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/challenge/${challenge.id}`}
          className="font-semibold hover:underline"
        >
          {challenge.name}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(challenge.startDate?.toDateString())} - {formatDate(challenge.endDate?.toDateString())}
          </p>
        </div>
      </div>
      <ChallengeOperations challenge={{ id: challenge.id, name: challenge.name }} />
    </div>
  )
}

ChallengeItem.Skeleton = function ChallengeItemSkeleton () {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
