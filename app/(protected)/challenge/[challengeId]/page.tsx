import { redirect } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
}

export default async function Challenge ({ params }: Props) {
  redirect(`/challenge/${params.id}/dashboard`)
}
