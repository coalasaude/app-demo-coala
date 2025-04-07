import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { toggleNetworkStatus } from '@/v3/infra/services/organizations/network'

export const useMutateToggleNetworkStatus = (networkId: number) => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationFn: () => toggleNetworkStatus(networkId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeyEnum.COST_CENTER_NETWORK, networkId],
      })
    },
  })

  return {
    toggleNetworkStatusMudate: mutateAsync,
    toggleNetworkStatusIsLoading: isLoading,
  }
}
