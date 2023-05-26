import Link from 'next/link'
import { getServerSession } from 'next-auth'

import { PageTitle } from '@/components/PageTitle'
import { buttonVariants } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function ChallengePage () {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  const challenges = await prisma.challenge.findMany({
    where: {
      userId: session.user.id
    }
  })

  // const challenges = await getData()

  // async function getData () {
  //   try {
  //     const res = await fetch(`${process.env.HOST}/api/challenge`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authentication: 'Bearer ' + 'getToken()'
  //       }
  //     })

  //     console.log('res.ok -> ', res.ok)

  //     const data = await res.json()
  //     console.log(data)

  //     // if (!res.ok) {
  //     //   throw new Error('Failed to fetch data')
  //     // }

  //     return data
  //   } catch (error) {
  //     console.log(error)
  //     toast({
  //       title: 'Error',
  //       description: 'Friday, February 10, 2023 at 5:57 PM'
  //     })
  //     return []
  //   }
  // }

  return (
    <>
      <PageTitle>Challenges</PageTitle>
      <div className='mb-4'>Hello! Number of challenges: {challenges.length}</div>
      <Link href='/challenge/new' className={buttonVariants()}>New challenge</Link>
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
              <TableCell className="font-medium">{challenge.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
