import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { deleteHealthInsurance } from '@/v3/infra/services/@v2/users/health-insurances/delete-health-insurance'

import { useMutate } from '../../@shared/useMutate'

export const useMutateDeleteHealthInsurance = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: deleteHealthInsurance,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.HEALTH_INSURANCE, variables.userId],
    onSuccess: () => onSuccessMessage('Convênio deletado com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
