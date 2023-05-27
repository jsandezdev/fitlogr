import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import React from 'react'

import { PageTitle } from '@/components/PageTitle'
import { Toaster } from '@/components/ui/Toaster'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

import { MainNav } from './components/MainNav'

interface Props {
  params: {
    id: string
  }
}

export default async function ChallengeLayout ({
  params,
  children
}: {
  children: React.ReactNode,
  params: Props
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  const challenge = await prisma.challenge.findUnique({
    where: {
      id: params.id
    }
  })

  if (!challenge || challenge.userId !== session.user.id) {
    notFound()
  }

  return (
    <>
      <main>
        <div className='flex flex-row justify-between align-middle'>
          <PageTitle>{challenge.name}</PageTitle>
          <MainNav challengeId={challenge.id}/>
        </div>
        <div className='max-w-screen-xl mx-auto py-4'>
          {children}
        </div>
      </main>
      <Toaster />
    </>
  )
}
