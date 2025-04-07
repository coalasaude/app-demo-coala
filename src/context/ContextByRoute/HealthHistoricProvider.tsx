import React, { createContext, useState } from 'react'

interface FirstFillingProps {
  isFillingData: boolean
  setIsFillingData: (value: boolean) => void
  lastFilledStep: number
  setLastFilledStep: (value: number) => void
  isFinished: boolean
  setIsFinished: (value: boolean) => void
}

export const StepsContext = createContext<FirstFillingProps>({} as FirstFillingProps)

export const HealthHistoricProvider = ({ children }: { children: React.ReactNode }) => {
  const [isFillingData, setIsFillingData] = useState(false)
  const [lastFilledStep, setLastFilledStep] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  return (
    <StepsContext.Provider
      value={{
        setIsFinished,
        isFinished,
        isFillingData,
        setIsFillingData,
        lastFilledStep,
        setLastFilledStep,
      }}
    >
      {children}
    </StepsContext.Provider>
  )
}
