import { PageTitle } from '@/components/PageTitle'

import { NewChallengeForm } from './NewChallengeForm'

export default async function NewChallenge () {
  return (
    <>
      <PageTitle>New challenge</PageTitle>
      <NewChallengeForm/>
    </>
  )
}
