import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Box } from '@mui/material'

import { CForm } from '@/components/Forms/Form'
import { AUTHENTICATED_ROUTES, ROUTES } from '@/constants/routes'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { useMutateLinkRole } from '@/v3/presentation/hooks/api/@v2/users/roles/useMutateLinkRole'
import { useFetchUserProfiles } from '@/v3/presentation/hooks/useFetchUserProfiles'
import { CContainerContent, PageHeader } from '@/v3/presentation/newComponents'
import {
  FormProfileForm,
  IFormProfiles,
  initialValuesProfile,
  schemaProfile,
} from '@/v3/presentation/pages/users/components/FormProfile'

export const ProfileAddPage = () => {
  const router = useRouter()
  const linkRoleMut = useMutateLinkRole()

  const { handleSubmit, control, watch, setValue, formState, ...others } = useForm<IFormProfiles>({
    defaultValues: initialValuesProfile,
    resolver: yupResolver(schemaProfile),
  })

  const [institutionId] = watch(['institutionId'])
  const { data: profiles } = useFetchUserProfiles({ institutionId: institutionId })

  const userId = Number(router.query.userId)

  const onSubmit = async (body: IFormProfiles) => {
    await linkRoleMut.mutateAsync({
      userId,
      profileId: Number(body.profileId),
      institutionId: body.institutionId || undefined,
      class: body.class,
      enrollment: body.enrollment,
      companyPositionId: Number(body.companyPositionId),
      educationalStageId: Number(body.educationalStageId),
      schoolGradeId: Number(body.schoolGradeId),
      healthRegister: body.registration,
    })

    router.push(`${ROUTES.MODULES.APP}${AUTHENTICATED_ROUTES.USERS}/${router.query.userId}/profile`)
  }

  return (
    <>
      <PageHeader title='Adicionar perfil' />

      <CForm
        form={{ handleSubmit, control, watch, formState, setValue, ...others }}
        onSubmit={onSubmit}
      >
        <CBaseContainer
          buttonLabel='Salvar'
          onConfirm={handleSubmit(onSubmit)}
          buttonDisabled={!formState.isDirty}
          isLoading={linkRoleMut.isPending}
          formButtonsProps={{ sx: { mt: { xs: 0, md: 1 } } }}
        >
          <CContainerContent>
            <Box display='flex' flexDirection='column' alignItems='center'>
              <FormProfileForm profiles={profiles || []} />
            </Box>
          </CContainerContent>
        </CBaseContainer>
      </CForm>
    </>
  )
}

export default ProfileAddPage
