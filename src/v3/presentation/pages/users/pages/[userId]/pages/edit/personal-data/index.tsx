import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { SubmitHandler } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { CContainerContent } from '@/v3/presentation/newComponents'
import { CDialogue, useModalContext } from '@/v3/presentation/components/Modal'
import { PageHeader } from '@/v3/presentation/newComponents'

import {
  FormPersonalData,
  useFormEditPersonalData,
} from '../../../../../components/FormPersonalData'
import { IPersonalDataFormFields } from '../../../../../components/FormPersonalData/schema'

export const PersonalDataEditPage = () => {
  const router = useRouter()
  const { handleModal } = useModalContext()
  const userId = Number(router.query.userId as string)

  const { form, isLoadingUpdateUser, isLoadingUser, onUpdateUser } = useFormEditPersonalData({
    userId,
  })

  const handleSubmit: SubmitHandler<IPersonalDataFormFields> = async (body) => {
    const onConfirm = async () => {
      if (userId) {
        await onUpdateUser(body)
        router.back()
      }
    }

    handleModal(
      <CDialogue
        title='Atenção!'
        confirmButtonLabel='Sim'
        cancelButtonLabel='Não'
        onConfirm={onConfirm}
        description='Você tem certeza que deseja salvar as alterações?'
      />,
    )
  }

  return (
    <>
      <PageHeader title='Editar informações pessoais' />
      <CForm id='myForm' form={form} onSubmit={handleSubmit}>
        <Box>
          {isLoadingUser ? (
            <ViewSkeleton />
          ) : (
            <CBaseContainer
              buttonLabel='Salvar'
              isLoading={isLoadingUpdateUser}
              buttonDisabled={!form.formState.isDirty}
            >
              <CContainerContent title='Informações pessoais'>
                <FormPersonalData />
              </CContainerContent>
            </CBaseContainer>
          )}
        </Box>
      </CForm>
    </>
  )
}
