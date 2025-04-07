import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { deleteHealthUnit } from '@/v3/infra/services/@v2/health-units/health-unit/delete-health-unit'

import { useMutate } from '../../@shared/useMutate'

export const useMutateDeleteHealthUnit = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: deleteHealthUnit,
    invalidateQueryKey: [QueryKeyEnum.HEALTH_UNIT],
    onSuccess: () => {
      onSuccessMessage('Unidade de saúde desativada com sucesso')
    },
    onError: onErrorMessage,
  })

  return mutate
}
