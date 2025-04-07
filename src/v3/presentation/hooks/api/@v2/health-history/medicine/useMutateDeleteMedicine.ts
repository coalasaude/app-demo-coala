import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { deleteMedicine } from '@/v3/infra/services/@v2/health-history/medicine/delete-medicine'

import { useMutate } from '../../@shared/useMutate'

export const useMutateDeleteMedicine = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: deleteMedicine,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.MEDICINE, variables.userId],
    onSuccess: () => onSuccessMessage('Medicamento deletado com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
