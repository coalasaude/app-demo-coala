import { useRouter } from 'next/router'

import { PageHeader } from '@/v3/presentation/newComponents'
import { useMutateCreateProfiles } from '@/v3/presentation/hooks/api/profile/useMutateCreateProfiles'
import { createProfilePayload } from '@/v3/infra/services/profiles/profiles'

import FormProfile from '../../components/FromProfile'

export const AddProfilePage = () => {
  const { createProfileMutate } = useMutateCreateProfiles()
  const router = useRouter()

  const onSubmit = async (values: createProfilePayload) => {
    await createProfileMutate(values)
    router.back()
  }

  return (
    <>
      <PageHeader title='Adicionar perfil' />
      <FormProfile onSubmit={onSubmit} />
    </>
  )
}
