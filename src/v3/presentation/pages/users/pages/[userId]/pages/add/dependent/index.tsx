import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { CForm } from '@/components/Forms'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { CContainerContent } from '@/v3/presentation/newComponents'
import { Permissions } from '@/constants/permissions'
import { useHasPermission } from '@/hooks/useHasPermission'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import { PageHeader } from '@/v3/presentation/newComponents'
import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'
import { useMutateAddChildren } from '@/v3/presentation/hooks/api/@v2/users/users/useMutateAddChildren'
import { nameNormalizer } from '@/components/Forms/normalizers/nameNormalizer'
import { useFetchBrowseUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchBrowseUser'
import { FormAddDependentWithResponsibleData } from '@/v3/presentation/pages/users/components/FormAddDependentWithResponsibleData'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

import { IDependent, schemaDependent } from './schema'

export const UserDependentAddPage = () => {
  const router = useRouter()
  const isAdmin = useAuth().user?.isAdmin
  const responsibleId = Number(router.query.userId)
  const [searchUser, setSearchUser] = useState<string | undefined>()
  const [canAddDependent] = useHasPermission([Permissions.ADD_RESPONSABLE])
  const form = useForm({
    resolver: yupResolver(schemaDependent),
  })
  const inputName = form.getValues('nameOrId')
  const { user: responsible } = useFetchReadUser({ userId: responsibleId })
  const { mutateAsync: addUserWithResponsibleMutate } = useMutateAddChildren({
    errorMessage: 'Erro ao cadastrar aluno, verifique os dados do responsável',
  })
  const { users } = useFetchBrowseUser({ searchUser: searchUser, onlyStudent: true })
  const { user: selectedUser, isLoading } = useFetchReadUser({
    userId: inputName ? Number(inputName) : undefined,
  })

  const handleSubmit: SubmitHandler<IDependent> = async (body) => {
    if (
      selectedUser &&
      selectedUser?.id === Number(body.nameOrId) &&
      selectedUser?.lastName === body.lastname
    ) {
      await addUserWithResponsibleMutate({
        children: [{ id: selectedUser.id }],
        role: { profileId: 3, institutionId: body.institutionId },
        responsible: [
          {
            lastName: responsible?.lastName || '',
            name: responsible?.name || '',
            email: responsible?.email || '',
            telephone: responsible?.telephone,
          },
        ],
      })
    } else {
      const inputNameValue = selectedUser ? selectedUser.name : body.nameOrId
      await addUserWithResponsibleMutate({
        children: [
          { name: nameNormalizer(inputNameValue), lastName: nameNormalizer(body.lastname) },
        ],
        role: { profileId: 3, institutionId: body.institutionId },
        responsible: [
          {
            lastName: responsible?.lastName || '',
            name: responsible?.name || '',
            email: responsible?.email || '',
            telephone: responsible?.telephone,
          },
        ],
      })
    }

    router.push(
      bindPathParams(`${NEW_ROUTES.AUTHENTICATED.USERS.VIEW.bindPath}/dependent`, {
        userId: Number(router.query.userId),
      }),
    )
  }

  useEffect(() => {
    if (!canAddDependent || !isAdmin) {
      router.push(
        bindPathParams(`${NEW_ROUTES.AUTHENTICATED.USERS.VIEW.bindPath}`, {
          userId: Number(router.query.userId),
        }),
      )
    }
  }, [canAddDependent, isAdmin, router])

  useEffect(() => {
    if (selectedUser) {
      form.setValue('lastname', selectedUser?.lastName)
    }
  }, [form, selectedUser])

  return (
    <>
      <PageHeader title='Adicionar dependente' />
      <CForm id='myForm' form={form} onSubmit={handleSubmit}>
        <Box>
          <CBaseContainer buttonLabel='Cadastrar' buttonDisabled={!form.formState.isDirty}>
            <CContainerContent title='Novo dependente' sx={{ padding: '8px 0' }}>
              <FormAddDependentWithResponsibleData
                users={users?.data}
                isLoading={isLoading}
                setSearchName={setSearchUser}
              />
            </CContainerContent>
          </CBaseContainer>
        </Box>
      </CForm>
    </>
  )
}
