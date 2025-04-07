import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { editMedicine } from '@/v3/infra/services/@v2/health-history/medicine/edit-medicine'

import { useMutate } from '../../@shared/useMutate'

export const useMutateEditMedicine = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: editMedicine,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.MEDICINE, variables.userId],
    onSuccess: () => onSuccessMessage('Medicamento editado com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
