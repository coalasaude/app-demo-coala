import { getMe } from '@/v3/infra/services/@v2/users/me/me'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'

import { useMutate } from '../../@shared/useMutate'

export const useMutateGetMe = () => {
  const { onErrorMessage } = useApiResponseHandler()

  const { mutateAsync, ...rest } = useMutate({
    mutationFn: getMe,
    invalidateQueryKey: false,
    onError: onErrorMessage,
  })

  return {
    ...rest,
    getMeMutate: mutateAsync,
    isLoadingMe: rest.isPending,
  }
}
