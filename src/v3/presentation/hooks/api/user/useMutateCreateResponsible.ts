import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { addResponsibleUser } from '@/v3/infra/services/user/user'

/**
 * @deprecated - Use useMutateAddResponsible from v2
 */
export const useMutateCreateResponsible = () => {
  const queryClient = useQueryClient()
  const { showSnackBar } = useLayout()

  const { mutateAsync: createResponsibleMutate, isPending: isLoading } = useMutation({
    mutationFn: addResponsibleUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.USER] })
      showSnackBar({
        type: 'success',
        message: 'Responsável criado com sucesso',
      })

      return data
    },
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Não foi possível criar um responsável',
      })
    },
  })

  return {
    createResponsibleMutate,
    isLoading,
  }
}
