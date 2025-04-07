import { useMutation } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { addNetwork } from '@/v3/infra/services/organizations/network'

export const useMutateAddNetwork = () => {
  const { showSnackBar } = useLayout()

  const { mutateAsync: addNetworkMutate, isPending: isLoading } = useMutation({
    mutationFn: addNetwork,
    onSuccess: () => {
      showSnackBar({
        type: 'success',
        message: 'A Rede foi cadastrada!',
      })
    },
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Não foi possível cadastrar a rede',
      })
    },
  })

  return {
    addNetworkMutate,
    isLoadingAddNetwork: isLoading,
  }
}
