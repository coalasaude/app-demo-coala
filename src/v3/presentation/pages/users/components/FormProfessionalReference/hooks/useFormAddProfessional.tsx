import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useMutateAddProfessionalReference } from '@/v3/presentation/hooks/api/@v2/users/professional-references/useMutateAddProfessionalReference'

import { IProfessionalFormFields, schemaProfessional } from '../schema'

export const useFormAddProfessional = ({ userId }: { userId?: number }) => {
  const addProfessionalReference = useMutateAddProfessionalReference()

  const form = useForm({
    resolver: yupResolver(schemaProfessional),
  })

  const onCreateProfessional: SubmitHandler<IProfessionalFormFields> = async (body) => {
    if (userId) {
      await addProfessionalReference.mutateAsync({
        userId: userId,
        name: body.name,
        telephone: body.phone,
        email: body.email,
        professionalType: body.professionalType,
      })
    }
  }

  return {
    onCreateProfessional,
    isLoadingCreateProfessional: addProfessionalReference.isPending,
    form,
  }
}
