import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { deleteMentalHealthDifficulties } from '@/v3/infra/services/@v2/mental-health/registers/difficulties/delete-difficulties'

import { useMutate } from '../../../@shared/useMutate'

export const useMutateDeleteMentalHealthDifficulties = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: deleteMentalHealthDifficulties,
    invalidateManyQueryKeys: (_, data) => [
      [QueryKeyEnum.MENTAL_HEALTH_REGISTER_DIFFICULTIES, data.userId],
      [QueryKeyEnum.MENTAL_HEALTH_REGISTER_CATEGORIES, data.userId],
    ],
    onError: onErrorMessage,
    onSuccess: () => {
      onSuccessMessage('Registro deletado')
    },
  })

  return mutate
}
