import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { extractApiError } from '@/v3/utils/extract-api-error'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { fetchGeneratePeiAI } from '@/v3/infra/services/@v2/mental-health/learning/fetch-generate-pei-ai'

import { useMutate } from '../@shared/useMutate'

export const useMutateGeneratePeiPdiAI = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: fetchGeneratePeiAI,
    invalidateQueryKey: [QueryKeyEnum.MENTAL_HEALTH_PEI_PDI],
    onSuccess: () => onSuccessMessage('Plano por IA gerado com sucesso'),
    onError: onErrorMessage,
  })

  const errorMessage: string | null = mutate.error ? extractApiError(mutate.error) : null

  return { ...mutate, errorMessage }
}
