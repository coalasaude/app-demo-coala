import { Box } from '@mui/material'
import { SubmitHandler } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { spacing } from '@/utils/spacing'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { useCWizardUrlControlContext } from '@/v3/presentation/hooks/useCWizardUrlControl'
import { FormComprovant } from '@/v3/presentation/pages/health-history/components/FormComprovant'
import { IVaccineComprovantFormFields } from '@/v3/presentation/pages/health-history/components/FormComprovant/schema'
import { useComprovantForm } from '@/v3/presentation/pages/health-history/hooks/useComprovantForm'

export const FormCompravantContainer = ({
  onSubmit,
  defaultValue,
}: {
  onSubmit: (body: IVaccineComprovantFormFields) => void
  defaultValue?: IVaccineComprovantFormFields
}) => {
  const { nextStep } = useCWizardUrlControlContext()

  const { form, options, isLoading, handleAsyncUpload, isLoadingDocument } = useComprovantForm({
    defaultValue,
  })

  const handleSubmit: SubmitHandler<IVaccineComprovantFormFields> = async (body) => {
    onSubmit(body)
    nextStep?.()
  }

  const disabled = !form.formState.isDirty && !defaultValue

  return (
    <>
      <CForm id='myForm' form={form} onSubmit={handleSubmit}>
        {isLoading ? (
          <ViewSkeleton />
        ) : (
          <CBaseContainer
            mt={spacing(2)}
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
