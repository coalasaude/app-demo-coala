import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { deleteBodyMass } from '@/v3/infra/services/@v2/health-history/body-mass/delete-body-mass'

import { useMutate } from '../../@shared/useMutate'

export const useMutateDeleteBodyMass = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: deleteBodyMass,
    invalidateManyQueryKeys: [[QueryKeyEnum.APPOINTMENT], [QueryKeyEnum.BODY_MASS]],
    onSuccess: () => onSuccessMessage('Medição deletadas com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
