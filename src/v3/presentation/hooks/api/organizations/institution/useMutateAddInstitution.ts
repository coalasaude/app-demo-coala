import { useMutation } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { addInstitution } from '@/v3/infra/services/organizations/institution'

export const useMutateAddInstitution = () => {
  const { showSnackBar } = useLayout()

  const { mutateAsync: addInstitutionMutate, isPending: isLoading } = useMutation({
    mutationFn: addInstitution,

    onSuccess: () => {
      showSnackBar({
        type: 'success',
        message: 'A instituição foi cadastrada!',
      })
    },

    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Não foi possível cadastrar a instituição',
      })
    },
  })

  return {
    addInstitutionMutate,
    isLoadingAddInstitution: isLoading,
  }
}
