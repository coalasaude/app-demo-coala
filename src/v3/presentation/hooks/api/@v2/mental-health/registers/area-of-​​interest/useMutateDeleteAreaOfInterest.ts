import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { deleteMentalHealthAreaOfInterest } from '@/v3/infra/services/@v2/mental-health/registers/area-of-​​interest/delete-area-of-​​interest'

import { useMutate } from '../../../@shared/useMutate'

export const useMutateDeleteMentalHealthAreaOfInterest = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: deleteMentalHealthAreaOfInterest,
    invalidateManyQueryKeys: (_, data) => [
      [QueryKeyEnum.MENTAL_HEALTH_REGISTER_AREA_OF_INTEREST, data.userId],
      [QueryKeyEnum.MENTAL_HEALTH_REGISTER_CATEGORIES, data.userId],
    ],
    onError: onErrorMessage,
    onSuccess: () => {
      onSuccessMessage('Registro deletado')
    },
  })

  return mutate
}
