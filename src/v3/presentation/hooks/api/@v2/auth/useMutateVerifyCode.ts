import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { verifyCode } from '@/v3/infra/services/@v2/auth/verify-code'

import { useMutate } from '../@shared/useMutate'

export const useMutateVerifyCode = () => {
  const { onErrorMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: verifyCode,
    invalidateQueryKey: [],
    onError: onErrorMessage,
  })

  return mutate
}
