import { Revision } from '@prisma/client'
import Link from 'next/link'

import { RevisionOperations } from '@/components/RevisionOperations'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDate } from '@/lib/utils'

interface Props {
  revision: Pick<Revision, 'id' | 'date' | 'challengeId'>
}

export function RevisionItem ({ revision }: Props) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/challenge/${revision.challengeId}/revision/${revision.id}`}
          className="font-semibold hover:underline"
        >
          {formatDate(revision.date.toDateString())}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">

          </p>
        </div>
      </div>
      <RevisionOperations revision={{ id: revision.id, challengeId: revision.challengeId, date: revision.date }} />
    </div>
  )
}

RevisionItem.Skeleton = function RevisionItemSkeleton () {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
