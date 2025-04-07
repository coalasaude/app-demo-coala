import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { SubmitHandler } from 'react-hook-form'
import { useEffect } from 'react'

import { CForm } from '@/components/Forms'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { CContainerContent } from '@/v3/presentation/newComponents'
import {
  FormResponsibleData,
  useFormCreateResponsible,
} from '@/v3/presentation/pages/users/components/FormResponsible'
import { IFormResponsibleDataFields } from '@/v3/presentation/pages/users/components/FormResponsible/schema'
import { Permissions } from '@/constants/permissions'
import { useHasPermission } from '@/hooks/useHasPermission'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import { PageHeader } from '@/v3/presentation/newComponents'

export const UserResponsibleAddPage = () => {
  const router = useRouter()

  const {
    form,
    onCreateResponsible,
    disabledEmail,
    disabledPhone,
    fetchByEmail,
    fetchByPhone,
    onChange,
    isLoading,
  } = useFormCreateResponsible()

  const handleSubmit: SubmitHandler<IFormResponsibleDataFields> = async (body) => {
    await onCreateResponsible(body)
    router.back()
  }

  const [canAddDependent] = useHasPermission([Permissions.ADD_RESPONSABLE])

  useEffect(() => {
    if (!canAddDependent) {
      router.push(
        bindPathParams(`${NEW_ROUTES.AUTHENTICATED.USERS.VIEW.bindPath}`, {
          userId: Number(router.query.userId),
        }),
      )
    }
  }, [canAddDependent, router])

  return (
    <>
      <PageHeader title='Adicionar responsável' />
      <CForm id='myForm' form={form} onSubmit={handleSubmit}>
        <Box>
          <>
            <CBaseContainer
              buttonLabel='Cadastrar'
              buttonDisabled={!form.formState.isDirty}
              isLoading={isLoading}
            >
              <CContainerContent title='Novo responsável' sx={{ padding: '8px 0' }}>
                <FormResponsibleData
                  boxProps={{
                    mt: 3,
                    mb: 2,
                  }}
                  inputProps={{
                    disabledPhone: disabledPhone,
                    disabledEmail: disabledEmail,
                    disabledName: fetchByEmail || fetchByPhone,
                    onChange: onChange,
                  }}
                />
              </CContainerContent>
            </CBaseContainer>
          </>
        </Box>
      </CForm>
    </>
  )
}
