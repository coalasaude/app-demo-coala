import { useMutation } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { inactiveHealthUnit } from '@/v3/infra/services/healthUnit'

/**
 * @deprecated - Use useMutateDeleteHealthUnit from v2 instead
 */
export const useMutateInactiveHealthUnit = () => {
  const { showSnackBar } = useLayout()

  const { mutateAsync: inactiveHealthUnitMutate, isPending: isLoading } = useMutation({
    mutationFn: inactiveHealthUnit,
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Não foi possível inativar a unidade de saúde',
      })
    },
  })

  return {
    inactiveHealthUnitMutate,
    isLoadingInactiveHealthUnit: isLoading,
  }
}
