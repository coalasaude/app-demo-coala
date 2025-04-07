import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { addMentalHealthMedicalAnalysis } from '@/v3/infra/services/@v2/mental-health/reports/medical-analysis/add-medical-analysis'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useMutate } from '../../../@shared/useMutate'

export const useMutateAddMentalHealthMedicalAnalysis = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addMentalHealthMedicalAnalysis,
    invalidateManyQueryKeys: (_, data) => [
      [QueryKeyEnum.MENTAL_HEALTH_REPORTS_MEDICAL_ANALYSIS, data.userId],
      [QueryKeyEnum.MENTAL_HEALTH_REPORT_TIMELINE, data.userId],
    ],
    onError: onErrorMessage,
    onSuccess: () => {
      onSuccessMessage('Análise enviada!')
    },
  })

  return mutate
}
