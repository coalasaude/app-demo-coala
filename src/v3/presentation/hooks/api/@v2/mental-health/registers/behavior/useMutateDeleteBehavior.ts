import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { deleteMentalHealthBehavior } from '@/v3/infra/services/@v2/mental-health/registers/behavior/delete-behavior'

import { useMutate } from '../../../@shared/useMutate'

export const useMutateDeleteMentalHealthBehavior = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: deleteMentalHealthBehavior,
    invalidateManyQueryKeys: (_, data) => [
      [QueryKeyEnum.MENTAL_HEALTH_REGISTER_BEHAVIOR, data.userId],
      [QueryKeyEnum.MENTAL_HEALTH_REGISTER_CATEGORIES, data.userId],
    ],
    onError: onErrorMessage,
    onSuccess: () => {
      onSuccessMessage('Registro deletado')
    },
  })

  return mutate
}
