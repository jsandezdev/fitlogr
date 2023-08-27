import { createContext, useContext, useState } from 'react';

interface ContextType {
  username: string;
}

type Props = {
  children: JSX.Element;
};

export const FormStateContext = createContext<ContextType | null>(null);

export function FormProvider({ children }: Props) {
  const value = useState<ContextType | null>(null);
  return (
    <FormStateContext.Provider value={value}>
      {children}
    </FormStateContext.Provider>
  );
}

export function useFormState() {
  const context = useContext(FormStateContext);

  if (!context)
    throw new Error('useFormState must be used within the FormProvider');

  return context;
}
