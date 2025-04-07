import { useRouter } from 'next/router'

import { PageHeader } from '@/v3/presentation/newComponents'
import { createProfilePayload } from '@/v3/infra/services/profiles/profiles'
import { useFetchProfileById } from '@/v3/presentation/hooks/api/profile/useFetchProfileById'
import { useMutateUpdateProfiles } from '@/v3/presentation/hooks/api/profile/useMutateUpdateProfiless'
import { useMutateRemoveProfile } from '@/v3/presentation/hooks/api/profile/useMutateRemoveProfile'
import { CDialogue, useModalContext } from '@/v3/presentation/components/Modal'

import FormProfile from '../../components/FromProfile'
import { FormSkeleton } from '../../../organizations/components/FormSkeleton'

export const EditProfilePage = () => {
  const router = useRouter()
  const id = router.query.id as string
  const { updateProfileMutate } = useMutateUpdateProfiles()
  const { removeProfileMutate } = useMutateRemoveProfile()
  const { data, isLoading } = useFetchProfileById(Number(id))
  const { handleModal } = useModalContext()

  const handleRemoveProfile = () => {
    handleModal(
      <CDialogue
        confirmButtonLabel='Sim'
        cancelButtonLabel='Não'
        onConfirm={onRemove}
        title='Atenção!'
        description='Tem certeza que deseja remover esse perfil?'
      />,
    )
  }

  const onSubmit = async (values: createProfilePayload) => {
    await updateProfileMutate({ ...values, id: Number(id) })
    router.back()
  }

  const onRemove = async () => {
    await removeProfileMutate(Number(id))
    router.back()
  }

  if (!data || isLoading) {
    return <FormSkeleton />
  }

  return (
    <>
      <PageHeader
        title='Editar perfil'
        secondaryButtonProps={{
          children: 'Remover',
          onClick: handleRemoveProfile,
        }}
      />
      <FormProfile onSubmit={onSubmit} data={data} />
    </>
  )
}
