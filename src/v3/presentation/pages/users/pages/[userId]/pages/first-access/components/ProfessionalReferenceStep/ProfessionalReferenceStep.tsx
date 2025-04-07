import { CWizard } from '@/v3/presentation/components/CWizard'
import { BaseStepProps } from '@/v3/presentation/pages/health-history/pages/first-access/types'

import { DecisionStep } from './steps/DecisionStep'
import { FormStep } from './steps/FormStep'

export type ProfessionalReferenceStepProps = BaseStepProps

export const ProfessionalReferenceStep = ({
  user,
  onSkip,
  onStart,
  onConfirm,
}: ProfessionalReferenceStepProps) => {
  return (
    <CWizard urlControl>
      <DecisionStep user={user} onSkip={onSkip} onStart={onStart} />
      <FormStep onSkip={onSkip} onConfirm={onConfirm} user={user} />
    </CWizard>
  )
}
