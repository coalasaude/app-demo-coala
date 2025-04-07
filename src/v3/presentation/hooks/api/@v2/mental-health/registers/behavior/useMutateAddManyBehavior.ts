import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { addManyMentalHealthBehavior } from '@/v3/infra/services/@v2/mental-health/registers/behavior/add-many-behavior'

import { useMutate } from '../../../@shared/useMutate'

export const useMutateAddManyMentalHealthBehavior = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addManyMentalHealthBehavior,
    invalidateManyQueryKeys: (_, data) => [
      [QueryKeyEnum.MENTAL_HEALTH_REGISTER_BEHAVIOR, data.userId],
      [QueryKeyEnum.MENTAL_HEALTH_REGISTER_CATEGORIES, data.userId],
    ],
    onError: onErrorMessage,
    onSuccess: () => {
      onSuccessMessage('Registro adicionado')
    },
  })

  return mutate
}
