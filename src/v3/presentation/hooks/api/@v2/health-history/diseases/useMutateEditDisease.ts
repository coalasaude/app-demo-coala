import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { editDisease } from '@/v3/infra/services/@v2/health-history/diseases/edit-disease'

import { useMutate } from '../../@shared/useMutate'

export const useMutateEditDisease = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: editDisease,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.DISEASE, variables.userId],
    onSuccess: () => onSuccessMessage('Doença editada com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
