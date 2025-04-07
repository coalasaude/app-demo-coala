import { useMutation } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { getMe } from '@/v3/infra/services/me/me'

/**
 * @deprecated - Use useFetchMe from v2
 */

export const useMutateGetMe = () => {
  const { showSnackBar } = useLayout()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: getMe,
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Erro ao buscar usuário logado',
      })

      return { error }
    },
  })

  return {
    ...rest,
    getMeMutate: mutateAsync,
    isLoadingMe: rest.isPending,
  }
}
