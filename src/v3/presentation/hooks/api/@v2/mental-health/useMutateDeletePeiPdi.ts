import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { deletePeiPdi } from '@/v3/infra/services/@v2/mental-health/learning/delete-pei-pdi'

import { useMutate } from '../@shared/useMutate'

export const useMutateDeletePeiPdi = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: deletePeiPdi,
    invalidateQueryKey: [QueryKeyEnum.MENTAL_HEALTH_PEI_PDI],
    onSuccess: () => onSuccessMessage('Plano encerrado'),
    onError: onErrorMessage,
  })

  return mutate
}
