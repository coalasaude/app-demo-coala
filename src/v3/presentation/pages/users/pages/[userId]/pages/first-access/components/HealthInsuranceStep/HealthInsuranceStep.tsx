import { CWizard } from '@/v3/presentation/components/CWizard'
import { BaseStepProps } from '@/v3/presentation/pages/health-history/pages/first-access/types'

import { DecisionStep } from './steps/DecisionStep'
import { FormStep } from './steps/FormStep'

export type HealthInsuranceStepProps = BaseStepProps

export const HealthInsuranceStep = ({
  user,
  onSkip,
  onStart,
  onConfirm,
}: HealthInsuranceStepProps) => {
  return (
    <CWizard urlControl>
      <DecisionStep user={user} onSkip={onSkip} onStart={onStart} />
      <FormStep onSkip={onSkip} onConfirm={onConfirm} user={user} />
    </CWizard>
  )
}
