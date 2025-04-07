import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { addUser } from '@/v3/infra/services/user/user'

import { getErrorMessage } from './../../../../utils/getErrorMessage'

/**
 * @deprecated - Use useMutateAddUser from v2
 */
export const useMutateAddUser = () => {
  const queryClient = useQueryClient()
  const { showSnackBar } = useLayout()

  const { mutateAsync: addUserMutate, isPending } = useMutation({
    mutationFn: addUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.USER] })
      showSnackBar({
        type: 'success',
        message: 'Usuário criado com sucesso',
      })

      return data
    },
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: getErrorMessage(error, 'Não foi possível criar um usuário'),
      })
    },
  })

  return {
    addUserMutate,
    isLoading: isPending,
  }
}
