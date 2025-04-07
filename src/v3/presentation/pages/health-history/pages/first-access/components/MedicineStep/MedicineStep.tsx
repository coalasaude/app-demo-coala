import { CWizard } from '@/v3/presentation/components/CWizard'

import { usePrescriptionControl } from '../../../../hooks/usePrescriptionControl'
import { BaseStepProps } from '../../types'

import { DecisionStep } from './steps/DecisionStep'
import { FormMedicineContainer } from './steps/FormMedicineContainer'
import { FormStepPrescription } from './steps/FormStepPrescription'

export type MedicineStepProps = BaseStepProps

export const MedicineStep = ({ user, onSkip, onStart, onConfirm }: MedicineStepProps) => {
  const {
    userId,
    prescriptions,
    setPrescriptionsIndex,
    handleAddPrescription,
    onSubmit,
    defaultValue,
  } = usePrescriptionControl()

  const handleSubmit = async () => {
    if (userId) {
      await onSubmit()
      await onConfirm()
    }
  }

  return (
    <CWizard urlControl>
      <DecisionStep user={user} onSkip={onConfirm} onStart={onStart} />
      <FormStepPrescription
        user={user}
        prescriptions={prescriptions}
        onConfirm={handleSubmit}
        onAdd={() => setPrescriptionsIndex(undefined)}
        onEdit={(_, index) => setPrescriptionsIndex(index)}
        onSkip={onSkip}
      />
      <FormMedicineContainer
        user={user}
        onSubmit={handleAddPrescription}
        defaultValue={defaultValue}
      />
    </CWizard>
  )
}
