import { useContext } from 'react';

import { NewWorkoutFormStateContext } from '../context/NewWorkoutFormContext';

export const useNewWorkoutFormState = () => {
  const context = useContext(NewWorkoutFormStateContext);
  if (!context)
    throw new Error(
      'useNewWorkoutFormState must be used within the NewWorkoutFormProvider',
    );
  return context;
};
