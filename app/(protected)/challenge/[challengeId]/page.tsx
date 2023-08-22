import { redirect } from 'next/navigation';

interface Props {
  params: {
    challengeId: string;
  };
}

export default async function Challenge({ params }: Props) {
  redirect(`/challenge/${params.challengeId}/dashboard`);
}
