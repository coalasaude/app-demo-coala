import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { addPrescription } from '@/v3/infra/services/@v2/health-history/medicine/add-prescription'

import { useMutate } from '../../@shared/useMutate'

export const useMutateAddPrescription = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addPrescription,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.MEDICINE, variables.userId],
    onSuccess: () => onSuccessMessage('Receituário criado com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
