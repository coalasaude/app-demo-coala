import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { postPassword } from '@/v3/infra/services/user/user'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

/**
 * @deprecated - Use useMutateChangePassword from v2
 */
export const useMutationPassword = () => {
  const queryClient = useQueryClient()
  const { auth } = useAuth()
  const { showSnackBar } = useLayout()

  const {
    mutateAsync: addPassword,
    data,
    error,
    ...rest
  } = useMutation({
    mutationFn: postPassword,
    onSuccess: (body) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.PASSWORD] })

      showSnackBar({
        type: 'success',
        message: auth?.user?.hasPassword
          ? 'Senha alterada com sucesso!'
          : 'Senha criada com sucesso!',
      })

      const data = true

      return { data, body }
    },
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Não foi possível adicionar senha',
      })
    },
  })

  return {
    data,
    error,
    addPassword,
    ...rest,
  }
}
