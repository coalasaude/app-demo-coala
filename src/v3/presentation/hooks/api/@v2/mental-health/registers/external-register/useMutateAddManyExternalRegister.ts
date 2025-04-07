import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { addManyMentalHealthExternalRegister } from '@/v3/infra/services/@v2/mental-health/registers/external-register/add-many-external-register'

import { useMutate } from '../../../@shared/useMutate'

export const useMutateAddManyMentalHealthExternalRegister = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addManyMentalHealthExternalRegister,
    invalidateManyQueryKeys: (_, data) => [
      [QueryKeyEnum.MENTAL_HEALTH_REGISTER_EXTERNAL_REGISTER, data.userId],
      [QueryKeyEnum.MENTAL_HEALTH_REGISTER_CATEGORIES, data.userId],
    ],
    onError: onErrorMessage,
    onSuccess: () => {
      onSuccessMessage('Registro adicionado')
    },
  })

  return mutate
}
