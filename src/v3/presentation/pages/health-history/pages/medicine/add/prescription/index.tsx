import { Box } from '@mui/material'
import { useRouter } from 'next/router'

import { CWizard } from '@/v3/presentation/components/CWizard'

import { usePrescriptionControl } from '../../../../hooks/usePrescriptionControl'

import { FormMedicineContainer } from './components/FormMedicineContainer'
import { FormPrescriptionContainer } from './components/FormPrescriptionContainer'

export const PrescriptionAddPage = () => {
  const router = useRouter()
  const {
    userId,
    prescriptions,
    setPrescriptionsIndex,
    handleAddPrescription,
    onSubmit,
    defaultValue,
    isLoadingCreatePrescriptions,
  } = usePrescriptionControl()

  const handleSubmit = async () => {
    if (userId) {
      await onSubmit()
      router.back()
    }
  }

  return (
    <Box>
      <CWizard>
        <FormPrescriptionContainer
          onSubmit={handleSubmit}
          isLoading={isLoadingCreatePrescriptions}
          onEdit={(_, index) => setPrescriptionsIndex(index)}
          onAdd={() => setPrescriptionsIndex(undefined)}
          prescriptions={prescriptions}
        />
        <FormMedicineContainer onSubmit={handleAddPrescription} defaultValue={defaultValue} />
      </CWizard>
    </Box>
  )
}
