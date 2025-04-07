import { useMutation } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { createPassword } from '@/v3/infra/services/login/authenticate'

/**
 * @deprecated - Use useMutateCreatePassword from v2
 */
export const useMutateCreatePassword = () => {
  const { showSnackBar } = useLayout()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: createPassword,
    onSuccess: () => {
      showSnackBar({
        type: 'success',
        message: 'Senha definida com sucesso',
      })
    },
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Erro ao criar senha do usuário',
      })

      return { error }
    },
  })

  return {
    createPasswordMutate: mutateAsync,
    ...rest,
  }
}
