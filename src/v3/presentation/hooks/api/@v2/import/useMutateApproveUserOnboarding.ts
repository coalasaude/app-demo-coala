import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { approveUserOnboarding } from '@/v3/infra/services/@v2/import'

import { useMutate } from '../@shared/useMutate'
import { useApiResponseHandler } from '../../../useApiResponseHandler'

export const useMutateApproveUserOnboarding = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: approveUserOnboarding,
    invalidateQueryKey: [QueryKeyEnum.IMPORT],
    onSuccess: () => {
      onSuccessMessage('Importação aprovada com sucesso')
    },
    onError: onErrorMessage,
  })

  return mutate
}
