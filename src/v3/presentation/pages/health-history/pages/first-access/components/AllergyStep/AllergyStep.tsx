import { CWizard } from '@/v3/presentation/components/CWizard'

import { BaseStepProps } from '../../types'

import { DecisionStep } from './steps/DecisionStep'
import { FormStep } from './steps/FormStep'

export type AllergyStepProps = BaseStepProps

export const AllergyStep = ({ user, onSkip, onStart, onConfirm }: AllergyStepProps) => {
  return (
    <CWizard urlControl>
      <DecisionStep user={user} onSkip={onConfirm} onStart={onStart} />
      <FormStep onSkip={onSkip} onConfirm={onConfirm} user={user} />
    </CWizard>
  )
}
