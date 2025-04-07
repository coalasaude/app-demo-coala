import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { IErrorResp } from '@/types/error.type'
import { initLogin } from '@/v3/infra/services/@v2/auth/init-login'

import { useApiResponseHandler } from '../../../useApiResponseHandler'
import { useMutate } from '../@shared/useMutate'

export const useMutateInitLogin = (options?: { skipErrorToast?: boolean }) => {
  const { onErrorMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: initLogin,
    invalidateQueryKey: [QueryKeyEnum.USER],
    onError: (error: IErrorResp) => {
      if (!options?.skipErrorToast) onErrorMessage(error)

      return
    },
  })

  return mutate
}
