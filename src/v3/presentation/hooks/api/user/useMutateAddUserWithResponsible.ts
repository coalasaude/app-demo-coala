import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { addUserWithResponsible } from '@/v3/infra/services/user/responsible'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

/**
 * @deprecated - Use useMutateAddChildren from v2
 */
export const useMutateAddUserWithResponsible = () => {
  const queryClient = useQueryClient()
  const { showSnackBar } = useLayout()

  const { mutateAsync: addUserWithResponsibleMutate, isPending } = useMutation({
    mutationFn: addUserWithResponsible,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.USER] })
      showSnackBar({
        type: 'success',
        message: 'Usuários adicionados com sucesso',
      })

      return data
    },
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Não foi possível adicionar os usuários',
      })
    },
  })

  return {
    addUserWithResponsibleMutate,
    isLoading: isPending,
  }
}
