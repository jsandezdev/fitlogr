import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import React from 'react'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

import { ChallengeNav } from './components/ChallengeNav'

interface Props {
  params: {
    challengeId: string
  },
  children: React.ReactNode
}

export default async function ChallengeLayout ({
  params,
  children
}: Props) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  const challenge = await prisma.challenge.findUnique({
    where: {
      id: params.challengeId
    }
  })

  if (!challenge || challenge.userId !== session.user?.id) {
    notFound()
  }

  return (
    <div className="grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
      <aside className="hidden w-[200px] flex-col md:flex">
        <ChallengeNav challengeId={params.challengeId} />
      </aside>
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  )
}
