import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { extractApiError } from '@/v3/utils/extract-api-error'
import { addSubCategory } from '@/v3/infra/services/@v2/mental-health/learning/add-sub-category'

import { useMutate } from '../@shared/useMutate'

export const useMutateAddSubCategory = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addSubCategory,
    invalidateManyQueryKeys: (_, variables) => [
      [QueryKeyEnum.MENTAL_HEALTH_PEI_PDI, variables.patientId],
    ],
    onSuccess: () => onSuccessMessage('Sub categoria criada com sucesso'),
    onError: onErrorMessage,
  })

  const errorMessage: string | null = mutate.error ? extractApiError(mutate.error) : null

  return { ...mutate, errorMessage }
}
