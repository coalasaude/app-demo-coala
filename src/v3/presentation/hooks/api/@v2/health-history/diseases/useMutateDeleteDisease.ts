import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { deleteDisease } from '@/v3/infra/services/@v2/health-history/diseases/delete-disease'

import { useMutate } from '../../@shared/useMutate'

export const useMutateDeleteDisease = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: deleteDisease,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.DISEASE, variables.userId],
    onSuccess: () => onSuccessMessage('Doença deletada com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
