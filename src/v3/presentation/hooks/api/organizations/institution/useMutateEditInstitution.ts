import { useMutation } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { editInstitution } from '@/v3/infra/services/organizations/institution'

export const useMutateEditInstitution = () => {
  const { showSnackBar } = useLayout()

  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationFn: editInstitution,

    onSuccess: () => {
      showSnackBar({
        type: 'success',
        message: 'A instituição foi atualizada!',
      })
    },

    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Não foi possível atualizar a instituição',
      })
    },
  })

  return { mutateAsync, isLoading }
}
