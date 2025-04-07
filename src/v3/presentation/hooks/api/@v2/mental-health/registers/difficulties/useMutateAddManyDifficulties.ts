import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { addManyMentalHealthDifficulties } from '@/v3/infra/services/@v2/mental-health/registers/difficulties/add-many-difficulties'

import { useMutate } from '../../../@shared/useMutate'

export const useMutateAddManyMentalHealthDifficulties = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addManyMentalHealthDifficulties,
    invalidateManyQueryKeys: (_, data) => [
      [QueryKeyEnum.MENTAL_HEALTH_REGISTER_DIFFICULTIES, data.userId],
      [QueryKeyEnum.MENTAL_HEALTH_REGISTER_CATEGORIES, data.userId],
    ],
    onError: onErrorMessage,
    onSuccess: () => {
      onSuccessMessage('Registro adicionado')
    },
  })

  return mutate
}
