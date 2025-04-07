import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { deleteMentalHealthReport } from '@/v3/infra/services/@v2/mental-health/reports/medical-reports/delete-mental-health-report'

import { useMutate } from '../../../@shared/useMutate'

export const useMutateDeleteMentalHealthReport = () => {
  const { onErrorMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: deleteMentalHealthReport,
    invalidateQueryKey: (_, data) => [QueryKeyEnum.MENTAL_HEALTH_REPORT_TIMELINE, data.userId],
    onError: onErrorMessage,
  })

  return mutate
}
