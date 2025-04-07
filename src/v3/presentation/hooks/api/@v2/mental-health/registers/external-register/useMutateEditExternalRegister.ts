import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { editMentalHealthExternalRegister } from '@/v3/infra/services/@v2/mental-health/registers/external-register/edit-external-register'

import { useMutate } from '../../../@shared/useMutate'

export const useMutateEditMentalHealthExternalRegister = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: editMentalHealthExternalRegister,
    invalidateManyQueryKeys: (_, data) => [
      [QueryKeyEnum.MENTAL_HEALTH_REGISTER_EXTERNAL_REGISTER, data.userId],
      [QueryKeyEnum.MENTAL_HEALTH_REGISTER_CATEGORIES, data.userId],
    ],
    onError: onErrorMessage,
    onSuccess: () => {
      onSuccessMessage('Registro editado')
    },
  })

  return mutate
}
