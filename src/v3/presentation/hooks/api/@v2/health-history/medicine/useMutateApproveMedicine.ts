import { approveMedicine } from '@/v3/infra/services/@v2/health-history/medicine/approve-medicine'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'

import { useMutate } from '../../@shared/useMutate'

export const useMutateApproveMedicine = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: approveMedicine,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.MEDICINE, variables.userId],
    onSuccess: () => onSuccessMessage('Medicamento editado com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
