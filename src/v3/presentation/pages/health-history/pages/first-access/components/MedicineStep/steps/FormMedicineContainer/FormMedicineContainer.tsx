import { Box } from '@mui/material'
import { SubmitHandler } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { spacing } from '@/utils/spacing'
import { UserModel } from '@/v3/domain/@v2/users/users.model'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { useCWizardUrlControlContext } from '@/v3/presentation/hooks/useCWizardUrlControl'
import { FormPrescriptionMedicine } from '@/v3/presentation/pages/health-history/components/FormPrescriptionMedicine'
import { IPrescriptionMedicineFormFields } from '@/v3/presentation/pages/health-history/components/FormPrescriptionMedicine/schema'
import { usePrescriptionForm } from '@/v3/presentation/pages/health-history/hooks/usePrescriptionForm'

export const FormMedicineContainer = ({
  onSubmit,
  user,
  defaultValue,
}: {
  onSubmit: (body: IPrescriptionMedicineFormFields) => void
  user: UserModel
  defaultValue?: IPrescriptionMedicineFormFields
}) => {
  const { previousStep } = useCWizardUrlControlContext()

  const {
    form,
    isLoadingMedicineOptions,
    concentrationUnitOptions,
    dosageUnitOptions,
    scheduledMedicineOptions,
    handleAsyncUploadMedicine,
    handleAsyncUploadPrescription,
  } = usePrescriptionForm({ userId: user.id, defaultValue })

  const handleSubmit: SubmitHandler<IPrescriptionMedicineFormFields> = async (body) => {
    onSubmit(body)
    previousStep?.()
  }

  const disabledButton = !form.formState.isDirty && !defaultValue

  return (
    <>
      <CForm id='myForm' form={form} onSubmit={handleSubmit}>
        {isLoadingMedicineOptions ? (
          <ViewSkeleton />
        ) : (
          <CBaseContainer
            mt={spacing(2)}
            title='Cadastro de medicamentos:'
            buttonDisabled={disabledButton}
            buttonLabel='Finalizar receita'
          >
            <Box mt={spacing(3)}>
              <FormPrescriptionMedicine
                handleAsyncUploadMedicine={handleAsyncUploadMedicine}
                handleAsyncUploadPrescription={handleAsyncUploadPrescription}
                concentrationUnitOptions={concentrationUnitOptions}
                dosageUnitOptions={dosageUnitOptions}
                scheduledMedicineOptions={scheduledMedicineOptions}
              />
            </Box>
          </CBaseContainer>
        )}
      </CForm>
    </>
  )
}
