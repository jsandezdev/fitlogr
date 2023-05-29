import { PageTitle } from '@/components/PageTitle'

import { NewChallengeFormWizard } from './components/NewChallengeFormWizard'

export default async function NewChallenge () {
  return (
    <>
      <div className='max-w-screen-sm mx-auto'>
        <PageTitle>Nuevo reto</PageTitle>
        <NewChallengeFormWizard/>
      </div>
    </>
  )
}
