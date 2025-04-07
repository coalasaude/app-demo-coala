

import { useContext } from 'react'

import { CWizardUrlControlContext } from '../components/CWizard/context/CWizardUrlControlContext'

export const useCWizardUrlControlContext = () => {
  const props = useContext(CWizardUrlControlContext)

  return props
}

