import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { extractApiError } from '@/v3/utils/extract-api-error'
import { readSubCategory } from '@/v3/infra/services/@v2/mental-health/learning/read-sub-category'

import { useMutate } from '../@shared/useMutate'

export const useMutateReadSubCategory = () => {
  const { onErrorMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: readSubCategory,
    invalidateQueryKey: false,
    onError: onErrorMessage,
  })

  const errorMessage: string | null = mutate.error ? extractApiError(mutate.error) : null

  return { ...mutate, errorMessage }
}
