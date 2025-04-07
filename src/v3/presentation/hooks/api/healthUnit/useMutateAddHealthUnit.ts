import { useMutation } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { addHealthUnit } from '@/v3/infra/services/healthUnit'

/**
 * @deprecated - Use useMutateAddHealthUnit from v2 instead
 */
export const useMutateAddHealthUnit = () => {
  const { showSnackBar } = useLayout()

  const { mutateAsync: addHealthUnitMutate, isPending: isLoading } = useMutation({
    mutationFn: addHealthUnit,
    onSuccess: () => {
      showSnackBar({
        type: 'success',
        message: 'A unidade foi cadastrada!',
      })
    },
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Não foi possível adicionar a únidade',
      })
    },
  })

  return {
    addHealthUnitMutate,
    isLoadingAddHealthUnit: isLoading,
  }
}
