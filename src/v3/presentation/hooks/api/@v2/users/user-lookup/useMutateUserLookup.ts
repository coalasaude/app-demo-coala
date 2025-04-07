import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { IErrorResp } from '@/types/error.type'
import { userLookup } from '@/v3/infra/services/@v2/users/user-lookup/user-lookup'

import { useApiResponseHandler } from '../../../../useApiResponseHandler'
import { useMutate } from '../../@shared/useMutate'

export const useMutateUserLookup = (options?: { skipErrorToast?: boolean }) => {
  const { onErrorMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: userLookup,
    invalidateQueryKey: [QueryKeyEnum.USER],
    onError: (error: IErrorResp) => {
      if (!options?.skipErrorToast) onErrorMessage(error)

      return
    },
  })

  return mutate
}
