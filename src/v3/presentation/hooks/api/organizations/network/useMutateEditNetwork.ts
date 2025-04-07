import { useMutation } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { editNetwork } from '@/v3/infra/services/organizations/network'

export const useMutateEditNetwork = () => {
  const { showSnackBar } = useLayout()

  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationFn: editNetwork,

    onSuccess: () => {
      showSnackBar({
        type: 'success',
        message: 'A rede foi atualizada!',
      })
    },

    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Não foi possível atualizar a rede',
      })
    },
  })

  return { mutateAsync, isLoading }
}
