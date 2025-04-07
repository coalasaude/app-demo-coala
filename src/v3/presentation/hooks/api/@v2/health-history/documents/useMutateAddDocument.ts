import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { addHealthHistoryDocument } from '@/v3/infra/services/@v2/health-history/documents/add-document'

import { useMutate } from '../../@shared/useMutate'

export const useMutateAddHealthHistoryDocument = () => {
  const { onErrorMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addHealthHistoryDocument,
    invalidateQueryKey: false,
    onError: onErrorMessage,
  })

  return mutate
}
