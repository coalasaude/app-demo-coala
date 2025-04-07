import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Box } from '@mui/material'

import { CForm } from '@/components/Forms/Form'
import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { AUTHENTICATED_ROUTES, NEW_ROUTES, ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { CDialogue, useModalContext } from '@/v3/presentation/components/Modal'
import { useMutateEditRole } from '@/v3/presentation/hooks/api/@v2/users/roles/useMutateEditRole'
import { useMutateUnlinkRole } from '@/v3/presentation/hooks/api/@v2/users/roles/useMutateUnlinkRole'
import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'
import { useFetchUserProfiles } from '@/v3/presentation/hooks/useFetchUserProfiles'
import { CContainerContent, PageHeader } from '@/v3/presentation/newComponents'
import { DeleteIconButton } from '@/v3/presentation/pages/health-history/components/DeleteIconButton'
import {
  FormProfileForm,
  IFormProfiles,
  initialValuesProfile,
  schemaProfile,
} from '@/v3/presentation/pages/users/components/FormProfile'
import { Profile } from '@/v3/domain/Profile'

export const ProfileEditPage = () => {
  const router = useRouter()
  const unlinkRoleMutate = useMutateUnlinkRole()
  const editRoleMutate = useMutateEditRole()
  const { handleModal } = useModalContext()

  const userId = Number(router.query.userId)
  const roleId = Number(router.query.userProfileId)

  const { handleSubmit, control, watch, setValue, formState, ...others } = useForm<IFormProfiles>({
    defaultValues: initialValuesProfile,
    resolver: yupResolver(schemaProfile),
  })

  const [institutionId] = watch(['institutionId'])
  const { data: profiles } = useFetchUserProfiles({ institutionId: institutionId })
  const { user, isPending: isLoadingUser } = useFetchReadUser({ userId })

  const onSubmit = async (body: IFormProfiles) => {
    const profile = profiles?.find((e) => e.id === Number(body.profileId))

    const isMedical = Profile.getIsMedicalByProfileType(profile?.type)
    const isAdmin = Profile.getIsAdminByProfileName(profile?.name)
    const isStudent = Profile.getIsDependentByProfileName(profile?.name)
    const isManager = !!profile && !isMedical && !isAdmin && !isStudent

    await editRoleMutate.mutateAsync({
      userId,
      roleId: roleId,
      profileId: Number(body.profileId),
      class: isStudent ? body.class : undefined,
      enrollment: isStudent ? body.enrollment : undefined,
      educationalStageId: isStudent ? Number(body.educationalStageId) : undefined,
      schoolGradeId: isStudent ? Number(body.schoolGradeId) : undefined,
      companyPositionId: isManager ? Number(body.companyPositionId) : undefined,
      healthRegister: isMedical ? body.registration : undefined,
    })

    router.push(`${ROUTES.MODULES.APP}${AUTHENTICATED_ROUTES.USERS}/${router.query.userId}/profile`)
  }

  const onDelete = (id: number) => {
    const action = async () => {
      if (!id) return
      await unlinkRoleMutate.mutateAsync({ userId, roleId: id })
      router.push(
        bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.PROFILE.path, {
          userId: router.query.userId,
        }),
      )
    }

    handleModal(
      <CDialogue
        confirmButtonLabel='Confirmar'
        onConfirm={async () => action()}
        title='Excluir Perfil'
        description='Tem certeza que deseja excluir este perfil deste usuário?'
      />,
    )
  }

  useEffect(() => {
    const selectedProfile = user?.roles?.find((e) => e.id === roleId)
    if (selectedProfile) {
      setValue('institutionId', selectedProfile.institution?.id || null)
      setValue('profileId', selectedProfile.profile.id)
      setValue('class', selectedProfile.class)
      setValue('registration', selectedProfile.healthRegister)
      setValue('enrollment', selectedProfile.enrollment)
      setValue('companyPositionId', selectedProfile.companyPosition?.id)
      setValue('educationalStageId', selectedProfile.educationalStage?.id)
      setValue('schoolGradeId', selectedProfile.schoolGrade?.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue, user])

  return (
    <>
      <PageHeader title='Editar perfil' />

      <CForm
        form={{ handleSubmit, control, watch, formState, setValue, ...others }}
        onSubmit={onSubmit}
      >
        {isLoadingUser ? (
          <ViewSkeleton />
        ) : (
          <CBaseContainer
            buttonLabel='Salvar'
            onConfirm={handleSubmit(onSubmit)}
            isLoading={editRoleMutate.isPending || unlinkRoleMutate.isPending}
            formButtonsProps={{ sx: { mt: { xs: 0, md: 1 } } }}
          >
            <CContainerContent>
              <Box display='flex' flexDirection='column' alignItems='center'>
                <Box>
                  <FormProfileForm profiles={profiles || []} disabledInstitutionInput />
                  <DeleteIconButton
                    mt={2}
                    onDelete={() => onDelete(roleId)}
                    label='Excluir vínculo'
                  />
                </Box>
              </Box>
            </CContainerContent>
          </CBaseContainer>
        )}
      </CForm>
    </>
  )
}

export default ProfileEditPage
