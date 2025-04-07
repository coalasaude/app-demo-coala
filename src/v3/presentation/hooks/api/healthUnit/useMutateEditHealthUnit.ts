import { useMutation } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { editHealthUnit } from '@/v3/infra/services/healthUnit'

/**
 * @deprecated - Use useMutateEditHealthUnit from v2 instead
 */
export const useMutateEditHealthUnit = () => {
  const { showSnackBar } = useLayout()

  const { mutateAsync: editHealthUnitMutate, isPending: isLoading } = useMutation({
    mutationFn: editHealthUnit,
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Não foi possível editar a unidade',
      })
    },
  })

  return {
    editHealthUnitMutate,
    isLoadingEditHealthUnit: isLoading,
  }
}
