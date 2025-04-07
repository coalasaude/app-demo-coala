import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { addManyHealthInsurance } from '@/v3/infra/services/@v2/users/health-insurances/add-many-health-insurance'

import { useMutate } from '../../@shared/useMutate'

export const useMutateAddManyHealthInsurance = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addManyHealthInsurance,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.HEALTH_INSURANCE, variables[0]?.userId],
    onSuccess: () => onSuccessMessage('Convênios criados com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
