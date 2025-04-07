import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { addMentalHealthRequestAnalysis } from '@/v3/infra/services/@v2/mental-health/reports/request-analysis/add-request-analysis'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useMutate } from '../../../@shared/useMutate'

export const useMutateAddMentalHealthRequestAnalysis = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addMentalHealthRequestAnalysis,
    invalidateQueryKey: (_, data) => [QueryKeyEnum.MENTAL_HEALTH_REPORT_TIMELINE, data.userId],
    onError: onErrorMessage,
    onSuccess: () => {
      onSuccessMessage('Análise solicitada!')
    },
  })

  return mutate
}
