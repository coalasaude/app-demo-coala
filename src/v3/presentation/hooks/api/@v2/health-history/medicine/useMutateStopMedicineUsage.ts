import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { stopUsageMedicine } from '@/v3/infra/services/@v2/health-history/medicine/stop-usage-medicine'

import { useMutate } from '../../@shared/useMutate'

export const useMutateStopUsageMedicine = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: stopUsageMedicine,
    invalidateQueryKey: (_, variables) => [
      QueryKeyEnum.MEDICINE,
      variables.userId,
      variables.id,
      variables.usageStopped,
    ],
    onSuccess: () => onSuccessMessage('Medicamento editado com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
