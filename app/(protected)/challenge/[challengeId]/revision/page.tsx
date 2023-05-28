import Link from 'next/link'
import { getServerSession } from 'next-auth'

import { PageTitle } from '@/components/PageTitle'
import { buttonVariants } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface Props {
  params: {
    challengeId: string
  }
}

export default async function Revision ({ params }: Props) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  const revisions = await prisma.revision.findMany({
    where: {
      // challenge: {
      //   id: params.challengeId
      // },
      challengeId: params.challengeId
    }
    // include: {
    //   challenge: true
    // }
  })

  console.log(revisions)

  return (
    <>
      <PageTitle>Revisions</PageTitle>
      <div className='mb-4'>Hello! Number of revisions: {revisions.length}</div>
      <Link href={`/challenge/${params.challengeId}/revision/new`} className={buttonVariants()}>New revision</Link>
      <Table>
        <TableCaption>A list of your recent revisions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {revisions.map((revision) => (
            <TableRow key={revision.id}>
              <TableCell className="font-medium">
                <Link href={`/challenge/${params.challengeId}/revision/${revision.id}/dashboard`}>{revision.id}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
