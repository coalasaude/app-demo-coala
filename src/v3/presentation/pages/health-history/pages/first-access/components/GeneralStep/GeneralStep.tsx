import { useState } from 'react'

import { CWizard } from '@/v3/presentation/components/CWizard'
import { UserModel } from '@/v3/domain/@v2/users/users.model'

import { FormStep } from './steps/FormStep'
import { HeightStep } from './steps/HeightStep'
import { MeasureDateStep } from './steps/MeasureDateStep'
import { WeightStep } from './steps/WeightStep'

export type GeneralStepProps = {
  user: UserModel
  onComplete: () => Promise<void>
}

export const GeneralStep = ({ onComplete, user }: GeneralStepProps) => {
  const [height, setHeight] = useState(0)
  const [weight, setWeight] = useState(0)

  return (
    <CWizard urlControl>
      <FormStep user={user} />
      <HeightStep user={user} setHeight={setHeight} />
      <WeightStep user={user} setWeight={setWeight} />
      <MeasureDateStep user={user} onConfirm={onComplete} weight={weight} height={height} />
    </CWizard>
  )
}
