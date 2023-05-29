import Link from 'next/link'
import { getServerSession } from 'next-auth'

import { PageTitle } from '@/components/PageTitle'
import { buttonVariants } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'


export default async function ChallengePage () {
  const session = await getServerSession(authOptions)

  if (!session) return new Response('Unauthorized', { status: 401 })

  const challenges = await prisma.challenge.findMany({
    where: {
      userId: session?.user?.id
    }
  })

  return (
    <>
      <PageTitle>Challenges</PageTitle>
      <div className='mb-4'>Hello! Number of challenges: {challenges.length}</div>
      {/* <NewChallengeButton /> */}
      <Link className={buttonVariants({ variant: 'outline' })} href='/challenge/new'>Nuevo reto</Link>
      <Table>
        <TableCaption>A list of your recent challenges.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {challenges.map((challenge) => (
            <TableRow key={challenge.id}>
              <TableCell className="font-medium">
                <Link href={`/challenge/${challenge.id}/dashboard`}>{challenge.name}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
