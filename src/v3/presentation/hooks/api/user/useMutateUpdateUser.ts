import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { updateUser } from '@/v3/infra/services/user/user'

/**
 * @deprecated - Use useMutateUpdateUser from v2
 */
export const useMutateUpdateUser = () => {
  const queryClient = useQueryClient()
  const { showSnackBar } = useLayout()

  const { mutateAsync: updateUserMutate, isPending: isLoading } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.USER] })
      showSnackBar({
        type: 'success',
        message: 'Informações atualizadas com sucesso',
      })

      return data
    },
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Não foi possível atualizar as informações',
      })
    },
  })

  return {
    updateUserMutate,
    isLoading,
  }
}
