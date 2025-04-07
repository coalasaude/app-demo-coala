import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { editMentalHealthBehavior } from '@/v3/infra/services/@v2/mental-health/registers/behavior/edit-behavior'

import { useMutate } from '../../../@shared/useMutate'

export const useMutateEditMentalHealthBehavior = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: editMentalHealthBehavior,
    invalidateManyQueryKeys: (_, data) => [
      [QueryKeyEnum.MENTAL_HEALTH_REGISTER_BEHAVIOR, data.userId],
      [QueryKeyEnum.MENTAL_HEALTH_REGISTER_CATEGORIES, data.userId],
    ],
    onError: onErrorMessage,
    onSuccess: () => {
      onSuccessMessage('Registro editado')
    },
  })

  return mutate
}
