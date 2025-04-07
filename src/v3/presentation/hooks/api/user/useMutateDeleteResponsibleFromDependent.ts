import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { deleteResponsibleFromDependent } from '@/v3/infra/services/user/user'

/**
 * @deprecated - Use useMutateDeleteResponsible from v2
 */
export const useMutateDeleteResponsibleFromDependent = () => {
  const queryClient = useQueryClient()
  const { showSnackBar } = useLayout()

  const { mutateAsync: removeResponsibleFromDependent, isPending: isLoading } = useMutation({
    mutationFn: deleteResponsibleFromDependent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.USER] })
      showSnackBar({
        type: 'success',
        message: 'Usuário desvinculado com sucesso',
      })
    },
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Não foi possível desvincular o usuário',
      })

      return { error }
    },
  })

  return {
    removeResponsibleFromDependent,
    isLoadingCreateAllergy: isLoading,
  }
}
