import { useMutation } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { initLogin } from '@/v3/infra/services/login/login'

/**
 * @deprecated - Use useMutateInitLogin from v2
 */

export const useMutateInitLogin = (options?: { skipErrorToast?: boolean }) => {
  const { showSnackBar } = useLayout()

  const {
    mutateAsync,
    isPending: isLoading,
    ...rest
  } = useMutation({
    mutationFn: initLogin,
    onError: (error: IErrorResp) => {
      if (!options?.skipErrorToast)
        showSnackBar({
          type: 'error',
          message: error.response?.data?.message || 'Erro ao iniciar login',
        })

      return { error }
    },
  })

  return {
    ...rest,
    initLoginMutate: mutateAsync,
    isLoadingInitLogin: isLoading,
  }
}
