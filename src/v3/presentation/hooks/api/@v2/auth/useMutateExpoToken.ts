import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { IErrorResp } from '@/types/error.type'
import { setExpoToken } from '@/v3/infra/services/@v2/auth/set-expo-token'

import { useApiResponseHandler } from '../../../useApiResponseHandler'
import { useMutate } from '../@shared/useMutate'

export const useMutateExpoToken = () => {
  const { onErrorMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: setExpoToken,
    invalidateQueryKey: [QueryKeyEnum.ACCESS],
    onError: (error: IErrorResp) => {
      onErrorMessage(error)

      return
    },
    onSuccess: () => {
      return true
    },
  })

  return mutate
}
