import { useRouter } from 'next/router'

import { CWizard } from '@/v3/presentation/components/CWizard'

import { useVaccineControl } from '../../../hooks/useVaccineControl'

import { FormCompravantContainer } from './FormCompravantContainer'
import { FormCompravantsContainer } from './FormCompravantsContainer'
import { FormVaccineDosageContainer } from './FormVaccineDosageContainer'

export const VaccineAddPage = () => {
  const router = useRouter()
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
      router.back()
    }
  }

  return (
    <>
      <CWizard>
        <FormCompravantsContainer
          onSubmit={handleSubmit}
          isLoading={isLoading}
          onAdd={() => setComprovantsIndex(undefined)}
          onEdit={(_, index) => setComprovantsIndex(index)}
          comprovants={comprovants}
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
    </>
  )
}
