import { createContext, useState } from 'react'

export const NewChallengeFormStateContext = createContext({})

export const NewChallengeFormProvider = ({ children }) => {
  const value = useState({})

  return (
    <NewChallengeFormStateContext.Provider value={value}>
      {children}
    </NewChallengeFormStateContext.Provider>
  )
}
