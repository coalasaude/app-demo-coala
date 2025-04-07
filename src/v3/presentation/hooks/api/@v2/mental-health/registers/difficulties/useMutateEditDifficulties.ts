import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { editMentalHealthDifficulties } from '@/v3/infra/services/@v2/mental-health/registers/difficulties/edit-difficulties'

import { useMutate } from '../../../@shared/useMutate'

export const useMutateEditMentalHealthDifficulties = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: editMentalHealthDifficulties,
    invalidateManyQueryKeys: (_, data) => [
      [QueryKeyEnum.MENTAL_HEALTH_REGISTER_DIFFICULTIES, data.userId],
      [QueryKeyEnum.MENTAL_HEALTH_REGISTER_CATEGORIES, data.userId],
    ],
    onError: onErrorMessage,
    onSuccess: () => {
      onSuccessMessage('Registro editado')
    },
  })

  return mutate
}
