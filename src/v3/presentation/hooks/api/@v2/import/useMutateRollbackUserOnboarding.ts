import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { rollbackUserOnboarding } from '@/v3/infra/services/@v2/import'

import { useMutate } from '../@shared/useMutate'
import { useApiResponseHandler } from '../../../useApiResponseHandler'

export const useMutateRollbackUserOnboarding = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: rollbackUserOnboarding,
    invalidateQueryKey: [QueryKeyEnum.IMPORT],
    onSuccess: () => {
      onSuccessMessage('Importação revertida com sucesso')
    },
    onError: onErrorMessage,
  })

  return mutate
}
