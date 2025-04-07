import { Box } from '@mui/material'
import { SubmitHandler } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { spacing } from '@/utils/spacing'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { useCWizard } from '@/v3/presentation/hooks/useCWizard'
import { PageHeader } from '@/v3/presentation/newComponents'

import { FormComprovant } from '../../../../components/FormComprovant'
import { IVaccineComprovantFormFields } from '../../../../components/FormComprovant/schema'
import { useComprovantForm } from '../../../../hooks/useComprovantForm'

export const FormCompravantContainer = ({
  onSubmit,
  defaultValue,
}: {
  onSubmit: (body: IVaccineComprovantFormFields) => void
  defaultValue?: IVaccineComprovantFormFields
}) => {
  const { nextStep, previousStep } = useCWizard()

  const { form, options, isLoading, handleAsyncUpload, isLoadingDocument } = useComprovantForm({
    defaultValue,
  })

  const handleSubmit: SubmitHandler<IVaccineComprovantFormFields> = async (body) => {
    onSubmit(body)
    nextStep()
  }

  const disabled = !form.formState.isDirty && !defaultValue

  return (
    <>
      <PageHeader onBack={previousStep} title='Ficha de saúde' />
      <CForm id='myForm' form={form} onSubmit={handleSubmit}>
        {isLoading ? (
          <ViewSkeleton />
        ) : (
          <CBaseContainer
            title='Cadastro de vacina:'
            buttonLabel='Continuar'
            isLoading={isLoadingDocument}
            buttonDisabled={disabled}
          >
            <Box mt={spacing(3)}>
              <FormComprovant handleAsyncUpload={handleAsyncUpload} vaccineOptions={options} />
            </Box>
          </CBaseContainer>
        )}
      </CForm>
    </>
  )
}
