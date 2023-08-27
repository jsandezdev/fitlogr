import { createContext, useState } from 'react';

export const NewWorkoutFormStateContext = createContext({});

export const NewWorkoutFormProvider = ({ children }) => {
  const value = useState({});

  return (
    <NewWorkoutFormStateContext.Provider value={value}>
      {children}
    </NewWorkoutFormStateContext.Provider>
  );
};
