'use client';

import { NewChallengeFormProvider } from '../context/NewChallengeFormContext';
import { NewChallengeFormWizard } from './NewChallengeFormWizard';

export const NewChallengeForm = () => {
  return (
    <NewChallengeFormProvider>
      <NewChallengeFormWizard />
    </NewChallengeFormProvider>
  );
};
