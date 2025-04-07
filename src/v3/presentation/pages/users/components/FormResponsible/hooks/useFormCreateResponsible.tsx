import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useMutateAddResponsible } from '@/v3/presentation/hooks/api/@v2/users/users/useMutateAddResponsible'

import { IFormResponsibleDataFields, schemaFormResponsibleDataFields } from '../schema'

import { useFormCheckResponsible } from './useFormCheckResponsible'

export const useFormCreateResponsible = () => {
  const router = useRouter()
  const userId = router.query.userId as string
  const form = useForm({
    resolver: yupResolver(schemaFormResponsibleDataFields),
  })
  const { mutateAsync: createResponsibleMutate, isPending: isLoading } = useMutateAddResponsible()
  const { disabledEmail, disabledPhone, fetchByEmail, fetchByPhone, onChange } =
    useFormCheckResponsible({ form: form as any })

  const onCreateResponsible: SubmitHandler<IFormResponsibleDataFields> = async (body) => {
    const response = await createResponsibleMutate({
      childId: Number(userId),
      email: body.email || undefined,
      lastName: body.lastname,
      name: body.name,
      telephone: body.phone || undefined,
    })

    return response
  }

  return {
    onCreateResponsible,
    form,
    fetchByEmail,
    fetchByPhone,
    onChange,
    isLoading,
    disabledPhone,
    disabledEmail,
  }
}
