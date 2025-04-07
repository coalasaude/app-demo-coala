import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { addMentalHealthReport } from '@/v3/infra/services/@v2/mental-health/reports/medical-reports/add-mental-health-report'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useMutate } from '../../../@shared/useMutate'

export const useMutateAddMentalHealthReport = () => {
  const { onErrorMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addMentalHealthReport,
    invalidateQueryKey: (_, data) => [QueryKeyEnum.MENTAL_HEALTH_REPORT_TIMELINE, data.userId],
    onError: onErrorMessage,
  })

  return mutate
}
