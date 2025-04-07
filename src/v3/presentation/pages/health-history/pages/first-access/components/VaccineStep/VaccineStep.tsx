import { CWizard } from '@/v3/presentation/components/CWizard'

import { BaseStepProps } from '../../types'
import { useVaccineControl } from '../../../../hooks/useVaccineControl'

import { DecisionStep } from './steps/DecisionStep'
import { FormStepCompravant } from './steps/FormStepCompravant'
import { FormCompravantContainer } from './steps/FormCompravantContainer'
import { FormVaccineDosageContainer } from './steps/FormVaccineDosageContainer'

export type VaccineStepProps = BaseStepProps

export const VaccineStep = ({ user, onSkip, onStart, onConfirm }: VaccineStepProps) => {
  const {
    userId,
    comprovants,
    setComprovantsIndex,
    handleAddComprovant,
    onSubmit,
    actualVaccineComprovant,
    isLoading,
    defaultValue,
    handleRemoveComprovantVaccine,
    existentVaccines,
  } = useVaccineControl()

  const handleSubmit = async () => {
    if (userId) {
      await onConfirm()
    }
  }

  return (
    <CWizard urlControl>
      <DecisionStep user={user} onSkip={onSkip} onStart={onStart} />
      <FormStepCompravant
        user={user}
        onSkip={onSkip}
        comprovants={comprovants}
        onConfirm={handleSubmit}
        onEdit={(_, index) => setComprovantsIndex(index)}
        onAdd={() => setComprovantsIndex(undefined)}
      />
      <FormCompravantContainer onSubmit={handleAddComprovant} defaultValue={defaultValue} />
      <FormVaccineDosageContainer
        onSubmit={onSubmit}
        defaultValue={actualVaccineComprovant}
        existentVaccines={existentVaccines}
        isLoading={isLoading}
        onRemove={handleRemoveComprovantVaccine}
      />
    </CWizard>
  )
}
