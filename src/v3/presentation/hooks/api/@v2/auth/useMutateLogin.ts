import { login } from '@/v3/infra/services/@v2/auth/login'
import { IErrorResp } from '@/types/error.type'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { AuthStorage } from '@/v3/infra/services/AuthStorage'

import { useApiResponseHandler } from '../../../useApiResponseHandler'
import { useMutate } from '../@shared/useMutate'

export const useMutateLogin = (options?: { skipErrorToast?: boolean }) => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: login,
    invalidateQueryKey: [QueryKeyEnum.USER],
    onSuccess: ({ accessToken, refreshToken }) => {
      onSuccessMessage('Login iniciado com sucesso')
      AuthStorage.set({
        accessToken,
        refreshToken,
      })
    },
    onError: (error: IErrorResp) => {
      if (!options?.skipErrorToast) onErrorMessage(error)

      return
    },
  })

  return mutate
}
