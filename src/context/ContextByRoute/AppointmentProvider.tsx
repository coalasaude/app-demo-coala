import React, { createContext, useState } from 'react'

interface Props {
  isFinished: boolean
  setIsFinished: (value: boolean) => void
}

export const AppointmentContext = createContext<Props>({} as Props)

export const AppointmentProvider = ({ children }: { children: React.ReactNode }) => {
  const [isFinished, setIsFinished] = useState(false)

  return (
    <AppointmentContext.Provider
      value={{
        setIsFinished,
        isFinished,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  )
}
