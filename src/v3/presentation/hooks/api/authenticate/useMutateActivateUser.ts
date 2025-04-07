import { useMutation } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { activateUser } from '@/v3/infra/services/login/authenticate'

/**
 * @deprecated - Use useMutateActivateUser from v2
 */

export const useMutateActivateUser = () => {
  const { showSnackBar } = useLayout()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: activateUser,
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Erro ao ativar usuário',
      })

      return { error }
    },
  })

  return {
    activateUserMutate: mutateAsync,
    ...rest,
  }
}
