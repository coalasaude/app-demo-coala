import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { deleteMentalHealthCoalaRegister } from '@/v3/infra/services/@v2/mental-health/registers/coala-register/delete-coala-register'

import { useMutate } from '../../../@shared/useMutate'

export const useMutateDeleteMentalHealthCoalaRegister = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: deleteMentalHealthCoalaRegister,
    invalidateManyQueryKeys: (_, data) => [
      [QueryKeyEnum.MENTAL_HEALTH_REGISTER_COALA_REGISTER, data.userId],
      [QueryKeyEnum.MENTAL_HEALTH_REGISTER_CATEGORIES, data.userId],
    ],
    onError: onErrorMessage,
    onSuccess: () => {
      onSuccessMessage('Registro deletado')
    },
  })

  return mutate
}
