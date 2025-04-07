import { createContext, useEffect } from 'react'
import { WizardValues } from 'react-use-wizard'
import React from 'react'

import { useCWizard } from '../../../hooks/useCWizard'
import { useUrlQueryControl } from '../../../hooks/useUrlQueryControl'

type CWizardUrlControlProps = Partial<WizardValues>

export const CWizardUrlControlContext = createContext<CWizardUrlControlProps>({})
export const CWizardUrlControlProvider: React.FC<{
  children?: React.ReactNode
  queryName?: string
  resetOnMount?: boolean
}> = ({ children, queryName = 'wstep', resetOnMount }) => {
  const { activeStep, goToStep, ...props } = useCWizard()

  const { queryParam, setQueryParam } = useUrlQueryControl({
    queryName,
    startValue: resetOnMount ? '0' : undefined,
  })

  useEffect(() => {
    if (activeStep && activeStep !== Number(queryParam)) {
      setQueryParam(String(activeStep))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep])

  useEffect(() => {
    if (activeStep !== Number(queryParam || 0)) {
      goToStep(Number(queryParam || 0))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParam])

  return (
    <CWizardUrlControlContext.Provider value={{ ...props, goToStep, activeStep }}>
      {children}
    </CWizardUrlControlContext.Provider>
  )
}
