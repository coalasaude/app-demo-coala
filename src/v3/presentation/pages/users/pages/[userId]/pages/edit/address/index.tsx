import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { SubmitHandler } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { CContainerContent } from '@/v3/presentation/newComponents'
import { CDialogue, useModalContext } from '@/v3/presentation/components/Modal'
import { PageHeader } from '@/v3/presentation/newComponents'

import { FormAddress, useFormEditAddress } from '../../../../../components/FormAddress'
import { IAddressFormFields } from '../../../../../components/FormAddress/schema'

export const UserAddressEditPage = () => {
  const router = useRouter()
  const { handleModal } = useModalContext()
  const userId = Number(router.query.userId as string)

  const { form, isLoading, onUpdateAddress, isLoadingMutate } = useFormEditAddress({
    userId,
  })

  const handleSubmit: SubmitHandler<IAddressFormFields> = async (body) => {
    const onConfirm = async () => {
      if (userId) {
        await onUpdateAddress(body)
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
      <PageHeader title='Editar endereço' />
      <CForm id='myForm' form={form} onSubmit={handleSubmit}>
        <Box>
          {isLoading ? (
            <ViewSkeleton />
          ) : (
            <>
              <CBaseContainer
                buttonLabel='Salvar'
                isLoading={isLoadingMutate}
                buttonDisabled={!form.formState.isDirty}
              >
                <CContainerContent title='Endereço'>
                  <FormAddress mt={3} mb={2} />
                </CContainerContent>
              </CBaseContainer>
            </>
          )}
        </Box>
      </CForm>
    </>
  )
}
