import { CWizard } from '@/v3/presentation/components/CWizard'

import { BaseStepProps } from '../../types'

import { DecisionStep } from './steps/DecisionStep'
import { FormStep } from './steps/FormStep'

export type DiseasesStepProps = BaseStepProps

export const DiseasesStep = ({ user, onSkip, onStart, onConfirm }: DiseasesStepProps) => {
  return (
    <CWizard urlControl>
      <DecisionStep user={user} onSkip={onConfirm} onStart={onStart} />
      <FormStep user={user} onSkip={onSkip} onConfirm={onConfirm} />
    </CWizard>
  )
}
