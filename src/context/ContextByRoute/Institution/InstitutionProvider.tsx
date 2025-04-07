import React, { createContext } from 'react'

interface Props {
  orgType: string
}

export const InstitutionContext = createContext<Props>({} as Props)

export const InstitutionProvider = ({
  children,
  orgType,
}: {
  children: React.ReactNode
  orgType: string
}) => {
  return (
    <InstitutionContext.Provider
      value={{
        orgType,
      }}
    >
      {children}
    </InstitutionContext.Provider>
  )
}
