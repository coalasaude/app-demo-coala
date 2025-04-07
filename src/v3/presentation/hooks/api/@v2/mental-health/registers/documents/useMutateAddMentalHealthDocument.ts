import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { addMentalHealthRegisterDocument } from '@/v3/infra/services/@v2/mental-health/registers/documents/add-document'

import { useMutate } from '../../../@shared/useMutate'

export const useMutateAddMentalHealthRegisterDocument = () => {
  const { onErrorMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addMentalHealthRegisterDocument,
    invalidateQueryKey: false,
    onError: onErrorMessage,
  })

  return mutate
}
