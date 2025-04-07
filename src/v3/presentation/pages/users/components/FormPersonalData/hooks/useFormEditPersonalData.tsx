import { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'
import { useMutateEditUser } from '@/v3/presentation/hooks/api/@v2/users/users/useMutateEditUser'

import { IPersonalDataFormFields, schemaPersonalData } from '../schema'

export const useFormEditPersonalData = ({ userId }: { userId: number }) => {
  const { user, isLoading } = useFetchReadUser({ userId })
  const { mutateAsync, isPending } = useMutateEditUser()

  const form = useForm({
    resolver: yupResolver(schemaPersonalData),
  })

  const onUpdateUser: SubmitHandler<IPersonalDataFormFields> = async (body) => {
    if (userId) {
      await mutateAsync({
        lastName: body.lastname,
        name: body.name,
        email: body.email || null,
        cpf: body.cpf || null,
        telephone: body.phone || null,
        userId,
      })
    }
  }

  useEffect(() => {
    if (user)
      form.reset({
        name: user?.name || '',
        lastname: user?.lastName || user?.lastName || '',
        cpf: user?.cpf || '',
        email: user?.email || '',
        phone: user?.telephone || '',
      })
  }, [form, user])

  return {
    onUpdateUser,
    isLoadingUser: isLoading,
    isLoadingUpdateUser: isPending,
    user,
    form,
  }
}
