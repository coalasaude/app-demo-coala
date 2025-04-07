import { useMutation } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { sendToken } from '@/v3/infra/services/login/authenticate'

/**
 * @deprecated - Use useMutateSendCode from v2
 */
export const useMutateSendToken = () => {
  const { showSnackBar } = useLayout()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: sendToken,
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Erro ao enviar código de validação',
      })

      return { error }
    },
  })

  return {
    sendTokenMutate: mutateAsync,
    ...rest,
  }
}
