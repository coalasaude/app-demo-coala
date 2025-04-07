import { Box, Typography } from '@mui/material'
import { SubmitHandler } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { spacing } from '@/utils/spacing'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { useCWizard } from '@/v3/presentation/hooks/useCWizard'
import { PageHeader } from '@/v3/presentation/newComponents'

import { FormVacineDosage } from '../../../../components/FormVacineDosage'
import { IVaccineDosageFormFields } from '../../../../components/FormVacineDosage/schema'
import { useVaccineDosageForm } from '../../../../hooks/useVaccineDosageForm'

export const FormVaccineDosageContainer = ({
  onSubmit,
  defaultValue,
  isLoading,
  onRemove,
  existentVaccines,
}: {
  onSubmit: (body: IVaccineDosageFormFields, options?: { onSuccess?: () => void }) => Promise<void>
  defaultValue?: IVaccineDosageFormFields
  existentVaccines?: Record<number, { dosesDate: Date[]; reinforcementDates: Date[] }>
  isLoading?: boolean
  onRemove?: (index: number) => void
}) => {
  const { previousStep, goToStep } = useCWizard()

  const {
    form,
    vaccineOptions,
    isLoading: isLoadingVaccineOptions,
  } = useVaccineDosageForm({ defaultValue })

  const handleSubmit: SubmitHandler<IVaccineDosageFormFields> = async (body) => {
    await onSubmit(body, {
      onSuccess: () => goToStep(0),
    })
  }

  return (
    <>
      <PageHeader title='Ficha de saúde' onBack={previousStep} />
      <CForm id='myForm' form={form} onSubmit={handleSubmit}>
        {isLoadingVaccineOptions ? (
          <ViewSkeleton />
        ) : (
          <CBaseContainer title='Cadastro de vacina:' buttonLabel='Continuar' isLoading={isLoading}>
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
    </>
  )
}
