import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { extractApiError } from '@/v3/utils/extract-api-error'
import { updatePeiPdi } from '@/v3/infra/services/@v2/mental-health/learning/update-pei-pdi'

import { useMutate } from '../@shared/useMutate'

export const useMutateUpdatePeiPdi = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: updatePeiPdi,
    invalidateQueryKey: [QueryKeyEnum.MENTAL_HEALTH_PEI_PDI],
    onSuccess: () => onSuccessMessage('Plano alterado com sucesso'),
    onError: onErrorMessage,
  })

  const errorMessage: string | null = mutate.error ? extractApiError(mutate.error) : null

  return { ...mutate, errorMessage }
}
