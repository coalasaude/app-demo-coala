import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { addManyDisease } from '@/v3/infra/services/@v2/health-history/diseases/add-many-disease'

import { useMutate } from '../../@shared/useMutate'

export const useMutateAddManyDisease = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addManyDisease,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.DISEASE, variables.userId],
    onSuccess: () => onSuccessMessage('Doenças criadas com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
