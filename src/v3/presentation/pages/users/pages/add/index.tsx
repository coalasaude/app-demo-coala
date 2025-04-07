import { useRouter } from 'next/router'
import { useState } from 'react'
import { usePostHog } from 'posthog-js/react'

import { Permissions } from '@/constants/permissions'
import { NEW_ROUTES } from '@/constants/routes'
import WithoutPermission from '@/containers/WithoutPermission'
import { useHasPermission } from '@/hooks/useHasPermission'
import { Profile } from '@/v3/domain/Profile'
import { CWizard } from '@/v3/presentation/components/CWizard'
import { PageHeader } from '@/v3/presentation/newComponents'
import { useMutateAddUser } from '@/v3/presentation/hooks/api/@v2/users/users/useMutateAddUser'
import { useMutateAddChildren } from '@/v3/presentation/hooks/api/@v2/users/users/useMutateAddChildren'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'

import { FormOnlyStudentStep } from './components/steps/FormOnlyStudentStep'
import { ProfileStep } from './components/steps/FormProfileStep'
import { FormResponsibleDependentStep } from './components/steps/FormResponsibleDependentStep'
import { FormResponsibleStep } from './components/steps/FormResponsibleStep'
import { FormUserStep } from './components/steps/FormUserStep'
import InfoResponsibleStep from './components/steps/InfoResponsibleStep'
import { IUserCreationDataState, IUserFormData } from './types'

export const UserAddPage = () => {
  const router = useRouter()
  const { getCount, resetCounting } = usePageTimeCounter()
  const posthog = usePostHog()

  const [data, setData] = useState<IUserCreationDataState>({})
  const [canAddUser] = useHasPermission([Permissions.ADD_USER])

  const { mutateAsync: addUserMutate, isPending: isLoadingUser } = useMutateAddUser()
  const { mutateAsync: addUserWithResponsibleMutate, isPending: isLoadingUserResp } =
    useMutateAddChildren({
      errorMessage: 'Erro ao cadastrar aluno, verifique os dados do responsável',
    })

  const isLoading = isLoadingUser || isLoadingUserResp

  const onCreateUser = async (body: IUserFormData) => {
    const responsible = data.responsible

    try {
      if (responsible && data.institutionId) {
        const dependents = []

        if (body.name && body.lastname) {
          dependents.push({ name: body.name, lastName: body.lastname })
        }

        if (body.dependentsIds) {
          dependents.push(...body.dependentsIds.map((id) => ({ id: id, name: '', lastName: '' })))
        }

        await addUserWithResponsibleMutate({
          role: { profileId: data.profileId!, institutionId: data.institutionId },
          children: dependents,
          responsible: responsible.map((responsible) => ({
            lastName: responsible.lastname,
            name: responsible.name || '',
            email: responsible.email || '',
            telephone: responsible.phone,
          })),
        })
      } else {
        await addUserMutate({
          role: {
            profileId: data.profileId!,
            institutionId: data.institutionId!,
            healthRegister: body.registerCode,
          },
          lastName: body.lastname!,
          name: body.name!,
          email: body.email!,
          telephone: body.phone!,
        })
      }

      posthog.capture('user_create_user', {
        time_spent: getCount(),
      })
      resetCounting()

      router.push(
        NEW_ROUTES.AUTHENTICATED.USERS.path +
          (data.institutionId ? `?institutionId=${data.institutionId}` : ''),
      )
    } catch (_) {}
  }

  const onEditData = (body: IUserCreationDataState) => {
    setData((prev) => ({ ...prev, ...body }))
  }

  const isMedical = Profile.getIsMedicalByProfileType(data?.profile?.type)
  const isStudent = Profile.getIsDependentByProfileName(data?.profile?.name)
  const isStudentWithAccess = isStudent && data.responsible === null
  const isResponsibleWithDependent = isStudent && !!data.dependents?.length
  const isResponsibleWithoutDependent =
    isStudent && !isResponsibleWithDependent && data.responsible?.length

  if (!canAddUser) <WithoutPermission />

  const searchParams = new URLSearchParams(window.location.search)
  const queryValue = searchParams.get('institutionId') || ''
  const initialInstitutionId =
    queryValue && queryValue != 'undefined' ? Number(queryValue) : undefined

  return (
    <>
      <PageHeader title='Adicionar usuário' />
      <CWizard urlControl resetOnMount>
        <ProfileStep initialInstitutionId={initialInstitutionId} onSetData={setData} />
        {!isStudent && (
          <FormUserStep
            title='Dados do usuário'
            onCreateUser={onCreateUser}
            withRegister={isMedical}
            isLoading={isLoading}
          />
        )}
        {isStudent && <InfoResponsibleStep onSetData={onEditData} />}
        {isStudentWithAccess && (
          <FormUserStep title='Aluno' onCreateUser={onCreateUser} isLoading={isLoading} />
        )}
        {!isStudentWithAccess && <FormResponsibleStep onSetData={onEditData} />}
        {isResponsibleWithoutDependent && (
          <FormOnlyStudentStep isLoading={isLoading} onCreateUser={onCreateUser} />
        )}
        {isResponsibleWithDependent && (
          <FormResponsibleDependentStep
            onCreateUser={onCreateUser}
            dependents={data.dependents || []}
            responsables={data.responsible || []}
            isLoading={isLoading}
          />
        )}
      </CWizard>
    </>
  )
}
