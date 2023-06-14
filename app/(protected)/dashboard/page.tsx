
// import { getServerSession } from 'next-auth'

import { PageTitle } from '@/components/PageTitle'
// import { authOptions } from '@/lib/auth'

export default async function Dashboard () {
  // const session = await getServerSession(authOptions)
  // console.log(session)

  return (
    <section className="text">
      <PageTitle>Inicio</PageTitle>
      <div className="flex flex-col gap-2">
        <a href="https://ui.shadcn.com/docs" target='_blank' rel='noreferrer'>https://ui.shadcn.com/docs</a>
        <a href="https://github.com/shadcn/ui/" target='_blank' rel='noreferrer'>https://github.com/shadcn/ui/</a>
        <a href="https://tx.shadcn.com/" target='_blank' rel='noreferrer'>https://tx.shadcn.com/</a>
        <a href="https://github.com/shadcn/taxonomy/" target='_blank' rel='noreferrer'>https://github.com/shadcn/taxonomy/</a>
      </div>
    </section>
  )
}
