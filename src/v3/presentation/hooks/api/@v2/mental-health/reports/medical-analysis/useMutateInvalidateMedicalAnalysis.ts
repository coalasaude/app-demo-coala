import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { invalidateMentalHealthMedicalAnalysis } from '@/v3/infra/services/@v2/mental-health/reports/medical-analysis/invalidate-medical-analysis'

import { useMutate } from '../../../@shared/useMutate'

export const useMutateInvalidateMentalHealthMedicalAnalysis = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: invalidateMentalHealthMedicalAnalysis,
    invalidateQueryKey: (_, data) => [
      QueryKeyEnum.MENTAL_HEALTH_REPORTS_MEDICAL_ANALYSIS,
      data.userId,
    ],
    onError: onErrorMessage,
    onSuccess: () => {
      onSuccessMessage('Análise invalidada!')
    },
  })

  return mutate
}
