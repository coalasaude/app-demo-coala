import { useMutation } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { login } from '@/v3/infra/services/login/login'

/**
 * @deprecated - Use useMutateLogin from v2
 */

export const useMutateLogin = (options?: {
  isChangePassword?: boolean
  skipErrorToast?: boolean
}) => {
  const { showSnackBar } = useLayout()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: login,
    onError: (error: IErrorResp) => {
      if (!options?.skipErrorToast)
        showSnackBar({
          type: 'error',
          message: error.response?.data?.message || 'Erro ao logar',
        })

      return { error }
    },
  })

  return {
    loginMutate: mutateAsync,
    ...rest,
  }
}
