import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { addBodyMass } from '@/v3/infra/services/@v2/health-history/body-mass/add-body-mass'

import { useMutate } from '../../@shared/useMutate'

export const useMutateAddBodyMass = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addBodyMass,
    invalidateManyQueryKeys: [[QueryKeyEnum.APPOINTMENT], [QueryKeyEnum.BODY_MASS]],
    onSuccess: () => onSuccessMessage('Medições criadas com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
