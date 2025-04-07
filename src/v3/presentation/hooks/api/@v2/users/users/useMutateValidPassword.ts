import { login } from '@/v3/infra/services/@v2/auth/login'
import { IErrorResp } from '@/types/error.type'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'

import { useMutate } from '../../@shared/useMutate'

export const useMutateValidPassword = (options?: { skipErrorToast?: boolean }) => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: login,
    invalidateQueryKey: [],
    onSuccess: () => {
      onSuccessMessage('Senha verificada com sucesso')
    },
    onError: (error: IErrorResp) => {
      if (!options?.skipErrorToast) onErrorMessage(error)

      return
    },
  })

  return mutate
}
