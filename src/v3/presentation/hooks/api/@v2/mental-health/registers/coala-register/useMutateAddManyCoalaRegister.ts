import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { addManyMentalHealthCoalaRegister } from '@/v3/infra/services/@v2/mental-health/registers/coala-register/add-many-coala-register'

import { useMutate } from '../../../@shared/useMutate'

export const useMutateAddManyMentalHealthCoalaRegister = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addManyMentalHealthCoalaRegister,
    invalidateManyQueryKeys: (_, data) => [
      [QueryKeyEnum.MENTAL_HEALTH_REGISTER_COALA_REGISTER, data.userId],
      [QueryKeyEnum.MENTAL_HEALTH_REGISTER_CATEGORIES, data.userId],
    ],
    onError: onErrorMessage,
    onSuccess: () => {
      onSuccessMessage('Registro adicionado')
    },
  })

  return mutate
}
