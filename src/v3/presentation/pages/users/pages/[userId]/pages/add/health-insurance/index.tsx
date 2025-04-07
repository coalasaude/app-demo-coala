import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { SubmitHandler } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { CContainerContent } from '@/v3/presentation/newComponents'
import { FormHealthInsurance } from '@/v3/presentation/pages/users/components/FormHealthInsurance'
import { IHealthInsuranceFormFields } from '@/v3/presentation/pages/users/components/FormHealthInsurance/schema'
import { useFormAddHealthInsurance } from '@/v3/presentation/pages/users/components/FormHealthInsurance/hooks/useFormAddHealthInsurance'
import { PageHeader } from '@/v3/presentation/newComponents'

export const UserHealthInsuranceAddPage = () => {
  const router = useRouter()
  const userId = Number(router.query.userId as string)

  const { form, isLoadingCreateHealthInsurance, onCreateHealthInsurance } =
    useFormAddHealthInsurance({ userId })

  const handleSubmit: SubmitHandler<IHealthInsuranceFormFields> = async (body) => {
    if (userId) {
      await onCreateHealthInsurance(body)
      router.back()
    }
  }

  return (
    <>
      <PageHeader title='Adicionar convênio' />
      <CForm id='myForm' form={form} onSubmit={handleSubmit}>
        <Box>
          <CBaseContainer
            buttonLabel='Cadastrar'
            isLoading={isLoadingCreateHealthInsurance}
            buttonDisabled={!form.formState.isDirty}
          >
            <CContainerContent title='Novo convênio'>
              <FormHealthInsurance mb={2} />
            </CContainerContent>
          </CBaseContainer>
        </Box>
      </CForm>
    </>
  )
}
