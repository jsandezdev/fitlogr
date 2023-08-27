import { useContext } from 'react';

import { NewExerciseFormStateContext } from '../context/NewExerciseFormContext';

export const useNewExerciseFormState = () => {
  const context = useContext(NewExerciseFormStateContext);
  if (!context)
    throw new Error(
      'useNewExerciseFormState must be used within the NewExerciseFormProvider',
    );
  return context;
};
