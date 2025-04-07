import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { addManyMentalHealthAreaOfInterest } from '@/v3/infra/services/@v2/mental-health/registers/area-of-​​interest/add-many-area-of-​​interest'

import { useMutate } from '../../../@shared/useMutate'

export const useMutateAddManyMentalHealthAreaOfInterest = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addManyMentalHealthAreaOfInterest,
    invalidateManyQueryKeys: (_, data) => [
      [QueryKeyEnum.MENTAL_HEALTH_REGISTER_AREA_OF_INTEREST, data.userId],
      [QueryKeyEnum.MENTAL_HEALTH_REGISTER_CATEGORIES, data.userId],
    ],
    onError: onErrorMessage,
    onSuccess: () => {
      onSuccessMessage('Registro adicionado')
    },
  })

  return mutate
}
