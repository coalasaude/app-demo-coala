import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { editMentalHealthAreaOfInterest } from '@/v3/infra/services/@v2/mental-health/registers/area-of-​​interest/edit-area-of-​​interest'

import { useMutate } from '../../../@shared/useMutate'

export const useMutateEditMentalHealthAreaOfInterest = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: editMentalHealthAreaOfInterest,
    invalidateManyQueryKeys: (_, data) => [
      [QueryKeyEnum.MENTAL_HEALTH_REGISTER_AREA_OF_INTEREST, data.userId],
      [QueryKeyEnum.MENTAL_HEALTH_REGISTER_CATEGORIES, data.userId],
    ],
    onError: onErrorMessage,
    onSuccess: () => {
      onSuccessMessage('Registro editado')
    },
  })

  return mutate
}
