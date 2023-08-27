'use client';

import { NewWorkoutFormProvider } from '../context/NewWorkoutFormContext';
import { NewWorkoutFormWizard } from './NewWorkoutFormWizard';

export const NewWorkoutForm = () => {
  return (
    <NewWorkoutFormProvider>
      <NewWorkoutFormWizard />
    </NewWorkoutFormProvider>
  );
};
