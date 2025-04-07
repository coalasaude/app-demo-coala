import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { editMentalHealthMedicalAnalysis } from '@/v3/infra/services/@v2/mental-health/reports/medical-analysis/edit-medical-analysis'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useMutate } from '../../../@shared/useMutate'

export const useMutateEditMentalHealthMedicalAnalysis = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: editMentalHealthMedicalAnalysis,
    invalidateQueryKey: (_, data) => [
      QueryKeyEnum.MENTAL_HEALTH_REPORTS_MEDICAL_ANALYSIS,
      data.userId,
    ],
    onError: onErrorMessage,
    onSuccess: () => {
      onSuccessMessage('Análise editada!')
    },
  })

  return mutate
}
