import { PageTitle } from '@/components/PageTitle'

import { NewRevisionForm } from './NewRevisionForm'

type Props = {
  params: {
    challengeId: string
  }
}

export default async function NewRevision ({ params } : Props) {
  return (
    <>
      <PageTitle>New revision</PageTitle>
      <NewRevisionForm challengeId={params.challengeId}/>
    </>
  )
}
