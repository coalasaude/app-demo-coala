import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { addHealthInsurance } from '@/v3/infra/services/@v2/users/health-insurances/add-health-insurance'

import { useMutate } from '../../@shared/useMutate'

export const useMutateAddHealthInsurance = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addHealthInsurance,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.HEALTH_INSURANCE, variables.userId],
    onSuccess: () => onSuccessMessage('Convênio criado com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
