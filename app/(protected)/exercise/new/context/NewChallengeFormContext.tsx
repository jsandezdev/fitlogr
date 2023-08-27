import { createContext, useState } from 'react';

export const NewExerciseFormStateContext = createContext({});

export const NewExerciseFormProvider = ({ children }) => {
  const value = useState({});

  return (
    <NewExerciseFormStateContext.Provider value={value}>
      {children}
    </NewExerciseFormStateContext.Provider>
  );
};
