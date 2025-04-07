import { Wizard, WizardProps } from 'react-use-wizard'

import { CWizardUrlControlProvider } from './context/CWizardUrlControlContext'

type CWizardProps = WizardProps & {
  children: React.ReactNode
  urlControl?: boolean
  resetOnMount?: boolean
}

export const CWizard: React.FC<CWizardProps> = ({
  children,
  urlControl,
  resetOnMount,
  ...props
}) => {
  return (
    <Wizard
      {...props}
      {...(urlControl && {
        wrapper: <CWizardUrlControlProvider resetOnMount={resetOnMount} />,
      })}
    >
      {children}
    </Wizard>
  )
}
