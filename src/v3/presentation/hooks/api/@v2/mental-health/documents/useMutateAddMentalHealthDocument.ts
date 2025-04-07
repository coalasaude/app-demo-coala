import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { addMentalHealthDocument } from '@/v3/infra/services/@v2/mental-health/documents/add-document'

import { useMutate } from '../../@shared/useMutate'

export const useMutateAddMentalHealthDocument = () => {
  const { onErrorMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addMentalHealthDocument,
    invalidateQueryKey: false,
    onError: onErrorMessage,
  })

  return mutate
}
