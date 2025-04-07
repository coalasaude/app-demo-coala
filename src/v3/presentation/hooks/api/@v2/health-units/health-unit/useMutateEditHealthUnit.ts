import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { editHealthUnit } from '@/v3/infra/services/@v2/health-units/health-unit/edit-health-unit'

import { useMutate } from '../../@shared/useMutate'

export const useMutateEditHealthUnit = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: editHealthUnit,
    invalidateQueryKey: [QueryKeyEnum.HEALTH_UNIT],
    onSuccess: () => {
      onSuccessMessage('Unidade de saúde editada com sucesso')
    },
    onError: onErrorMessage,
  })

  return mutate
}
