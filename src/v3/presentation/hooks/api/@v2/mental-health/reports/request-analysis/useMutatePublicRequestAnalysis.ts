import { publicMentalHealthRequestAnalysis } from '@/v3/infra/services/@v2/mental-health/reports/request-analysis/public-request-analysis'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useMutate } from '../../../@shared/useMutate'

export const useMutatePublicMentalHealthRequestAnalysis = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: publicMentalHealthRequestAnalysis,
    invalidateManyQueryKeys: (_, data) => [
      [QueryKeyEnum.MENTAL_HEALTH_REPORTS_REQUEST_ANALYSIS, data.userId],
      [QueryKeyEnum.MENTAL_HEALTH_REPORTS_MEDICAL_ANALYSIS, data.userId],
    ],
    onError: onErrorMessage,
    onSuccess: () => {
      onSuccessMessage('Análise liberada para responsáveis')
    },
  })

  return mutate
}
