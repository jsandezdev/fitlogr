import { PageTitle } from '@/components/PageTitle'

import { NewChallengeForm } from './components/NewChallengeForm'

export default async function NewChallenge () {
  return (
    <>
      <div className='max-w-screen-sm mx-auto'>
        <PageTitle>Nuevo reto</PageTitle>
        <NewChallengeForm/>
      </div>
    </>
  )
}
