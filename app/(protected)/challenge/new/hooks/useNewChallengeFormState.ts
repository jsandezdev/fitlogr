import { useContext } from 'react';

import { NewChallengeFormStateContext } from '../context/NewChallengeFormContext';

export const useNewChallengeFormState = () => {
  const context = useContext(NewChallengeFormStateContext);
  if (!context)
    throw new Error(
      'useNewChallengeFormState must be used within the NewChallengeFormProvider',
    );
  return context;
};
