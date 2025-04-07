import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { addHealthUnit } from '@/v3/infra/services/@v2/health-units/health-unit/add-health-unit'

import { useMutate } from '../../@shared/useMutate'

export const useMutateAddHealthUnit = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addHealthUnit,
    invalidateQueryKey: [QueryKeyEnum.HEALTH_UNIT],
    onSuccess: () => {
      onSuccessMessage('Unidade de saúde criada com sucesso')
    },
    onError: onErrorMessage,
  })

  return mutate
}
