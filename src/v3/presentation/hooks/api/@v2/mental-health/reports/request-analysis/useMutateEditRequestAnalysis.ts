import { editMentalHealthRequestAnalysis } from '@/v3/infra/services/@v2/mental-health/reports/request-analysis/edit-request-analysis'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useMutate } from '../../../@shared/useMutate'

export const useMutateEditMentalHealthRequestAnalysis = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: editMentalHealthRequestAnalysis,
    invalidateQueryKey: (_, data) => [
      QueryKeyEnum.MENTAL_HEALTH_REPORTS_REQUEST_ANALYSIS,
      data.userId,
    ],
    onError: onErrorMessage,
    onSuccess: () => {
      onSuccessMessage('Solicitação editada!')
    },
  })

  return mutate
}
