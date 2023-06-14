import { PageHeader } from '@/components/PageHeader'
import { ProtectedPage } from '@/components/ProtectedPage'

import { NewRevisionForm } from './components/NewRevisionForm'

type Props = {
  params: {
    challengeId: string
  }
}

export default async function NewRevision ({ params } : Props) {
  return (
    <ProtectedPage>
      <PageHeader heading="Nueva revisión" text="Introduce a continuación los datos de la revisión" />
      <div>
        <NewRevisionForm challengeId={params.challengeId}/>
      </div>
    </ProtectedPage>
  )
}
