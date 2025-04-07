import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { addDisease } from '@/v3/infra/services/@v2/health-history/diseases/add-disease'

import { useMutate } from '../../@shared/useMutate'

export const useMutateAddDisease = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addDisease,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.DISEASE, variables.userId],
    onSuccess: () => onSuccessMessage('Doença criada com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
