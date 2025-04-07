import { useMutation } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { changePassword } from '@/v3/infra/services/login/authenticate'

/**
 * @deprecated - Use useMutateChangePassword from v2
 */
export const useMutateChangePassword = () => {
  const { showSnackBar } = useLayout()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      showSnackBar({
        type: 'success',
        message: 'Senha redefinida com sucesso',
      })
    },
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Erro ao redefinir senha do usuário',
      })

      return { error }
    },
  })

  return {
    changePasswordMutate: mutateAsync,
    ...rest,
  }
}
