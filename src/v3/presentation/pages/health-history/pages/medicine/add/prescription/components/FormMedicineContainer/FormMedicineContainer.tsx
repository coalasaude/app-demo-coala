import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { SubmitHandler } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { spacing } from '@/utils/spacing'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { useCWizard } from '@/v3/presentation/hooks/useCWizard'
import { FormPrescriptionMedicine } from '@/v3/presentation/pages/health-history/components/FormPrescriptionMedicine'
import { IPrescriptionMedicineFormFields } from '@/v3/presentation/pages/health-history/components/FormPrescriptionMedicine/schema'
import { usePrescriptionForm } from '@/v3/presentation/pages/health-history/hooks/usePrescriptionForm'
import { PageHeader } from '@/v3/presentation/newComponents'

export const FormMedicineContainer = ({
  onSubmit,
  defaultValue,
}: {
  onSubmit: (body: IPrescriptionMedicineFormFields) => void
  defaultValue?: IPrescriptionMedicineFormFields
}) => {
  const { previousStep } = useCWizard()
  const router = useRouter()
  const userId = Number(router.query.userId as string)

  const {
    form,
    isLoadingMedicineOptions,
    concentrationUnitOptions,
    dosageUnitOptions,
    scheduledMedicineOptions,
    handleAsyncUploadMedicine,
    handleAsyncUploadPrescription,
  } = usePrescriptionForm({ userId: userId, defaultValue })

  const handleSubmit: SubmitHandler<IPrescriptionMedicineFormFields> = async (body) => {
    onSubmit(body)
    previousStep()
  }

  const disabledButton = !form.formState.isDirty && !defaultValue

  return (
    <>
      <PageHeader onBack={previousStep} title='Ficha de saúde' />
      <CForm id='myForm' form={form} onSubmit={handleSubmit}>
        {isLoadingMedicineOptions ? (
          <ViewSkeleton />
        ) : (
          <CBaseContainer
            mt={spacing(2)}
            title='Cadastro de medicamentos:'
            buttonLabel='Finalizar receita'
            buttonDisabled={disabledButton}
          >
            <Box mt={spacing(3)}>
              <FormPrescriptionMedicine
                handleAsyncUploadPrescription={handleAsyncUploadPrescription}
                handleAsyncUploadMedicine={handleAsyncUploadMedicine}
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
