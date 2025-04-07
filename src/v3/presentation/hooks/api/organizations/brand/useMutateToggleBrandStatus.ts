import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { toggleBrandStatus } from '@/v3/infra/services/organizations/brand'

export const useMutateToggleBrandStatus = (brandId: number) => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationFn: () => toggleBrandStatus(brandId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.COST_CENTER_BRAND, brandId] })
    },
  })

  return {
    toggleBrandStatusMudate: mutateAsync,
    toggleBrandStatusIsLoading: isLoading,
  }
}
