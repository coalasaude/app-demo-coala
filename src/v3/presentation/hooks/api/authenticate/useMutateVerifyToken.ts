import { useMutation } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { verifyToken } from '@/v3/infra/services/login/authenticate'

/**
 * @deprecated - Use useMutateVerifyCode from v2
 */
export const useMutateVerifyToken = () => {
  const { showSnackBar } = useLayout()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: verifyToken,
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Erro ao verificar código',
      })

      return { error }
    },
  })

  return {
    verifyTokenMutate: mutateAsync,
    ...rest,
  }
}
