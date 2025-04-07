import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { extractApiError } from '@/v3/utils/extract-api-error'
import { addLikeComment } from '@/v3/infra/services/@v2/mental-health/learning/add-like-comment'

import { useMutate } from '../@shared/useMutate'

export const useMutateHandleLikeComment = () => {
  const { onErrorMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addLikeComment,
    invalidateQueryKey: [QueryKeyEnum.MENTAL_HEALTH_PEI_PDI_COMMENT],
    onError: onErrorMessage,
  })

  const errorMessage: string | null = mutate.error ? extractApiError(mutate.error) : null

  return { ...mutate, errorMessage }
}
