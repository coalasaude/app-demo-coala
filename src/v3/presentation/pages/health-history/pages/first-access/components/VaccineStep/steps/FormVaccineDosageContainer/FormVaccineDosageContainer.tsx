import { Box, Typography } from '@mui/material'
import { SubmitHandler } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { spacing } from '@/utils/spacing'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { useCWizardUrlControlContext } from '@/v3/presentation/hooks/useCWizardUrlControl'
import { FormVacineDosage } from '@/v3/presentation/pages/health-history/components/FormVacineDosage'
import { IVaccineDosageFormFields } from '@/v3/presentation/pages/health-history/components/FormVacineDosage/schema'
import { useVaccineDosageForm } from '@/v3/presentation/pages/health-history/hooks/useVaccineDosageForm'

export const FormVaccineDosageContainer = ({
  onSubmit,
  onRemove,
  defaultValue,
  isLoading,
  existentVaccines,
}: {
  onSubmit: (body: IVaccineDosageFormFields, options?: { onSuccess?: () => void }) => Promise<void>
  defaultValue?: IVaccineDosageFormFields
  existentVaccines?: Record<number, { dosesDate: Date[]; reinforcementDates: Date[] }>
  isLoading?: boolean
  onRemove?: (index: number) => void
}) => {
  const { goToStep } = useCWizardUrlControlContext()

  const {
    form,
    vaccineOptions,
    isLoading: isLoadingVaccineOptions,
  } = useVaccineDosageForm({ defaultValue })

  const handleSubmit: SubmitHandler<IVaccineDosageFormFields> = async (body) => {
    await onSubmit(body, {
      onSuccess: () => goToStep?.(1),
    })
  }

  return (
    <CForm id='myForm' form={form} onSubmit={handleSubmit}>
      {isLoadingVaccineOptions ? (
        <ViewSkeleton />
      ) : (
        <CBaseContainer
          mt={spacing(2)}
          title='Cadastro de vacina:'
          buttonLabel='Continuar'
          buttonDisabled={!form.formState.isDirty && !defaultValue}
          isLoading={isLoading}
        >
          <Typography variant='h6' sx={{ marginBottom: '16px' }}>
            Agora é a hora de completar as informações das vacinas presentes no comprovante.
          </Typography>
          <Box mt={spacing(3)}>
            <FormVacineDosage
              existentVaccines={existentVaccines}
              onRemove={onRemove}
              vaccineOptions={vaccineOptions}
            />
          </Box>
        </CBaseContainer>
      )}
    </CForm>
  )
}
