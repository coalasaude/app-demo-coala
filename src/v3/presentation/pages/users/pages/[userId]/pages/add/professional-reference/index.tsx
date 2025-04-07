import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { SubmitHandler } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { CContainerContent } from '@/v3/presentation/newComponents'
import { FormProfessionalReference } from '@/v3/presentation/pages/users/components/FormProfessionalReference'
import { IProfessionalFormFields } from '@/v3/presentation/pages/users/components/FormProfessionalReference/schema'
import { useFormAddProfessional } from '@/v3/presentation/pages/users/components/FormProfessionalReference/hooks/useFormAddProfessional'
import { PageHeader } from '@/v3/presentation/newComponents'

export const UserProfessionalReferenceAddPage = () => {
  const router = useRouter()
  const userId = Number(router.query.userId as string)

  const { form, isLoadingCreateProfessional, onCreateProfessional } = useFormAddProfessional({
    userId,
  })

  const handleSubmit: SubmitHandler<IProfessionalFormFields> = async (body) => {
    if (userId) {
      await onCreateProfessional(body)
      router.back()
    }
  }

  return (
    <>
      <PageHeader title='Adicionar profissional de saúde' />
      <CForm id='myForm' form={form} onSubmit={handleSubmit}>
        <Box>
          <CBaseContainer
            buttonLabel='Cadastrar'
            isLoading={isLoadingCreateProfessional}
            buttonDisabled={!form.formState.isDirty}
          >
            <CContainerContent title='Novo profissional de saúde'>
              <FormProfessionalReference mb={2} />
            </CContainerContent>
          </CBaseContainer>
        </Box>
      </CForm>
    </>
  )
}
