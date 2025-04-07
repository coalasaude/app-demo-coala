import { changePassword } from '@/v3/infra/services/@v2/auth/change-password'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'

import { useMutate } from '../@shared/useMutate'

export const useMutateChangePassword = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: changePassword,
    invalidateQueryKey: [QueryKeyEnum.USER],
    onSuccess: () => {
      onSuccessMessage('Senha redefinida com sucesso')
    },
    onError: onErrorMessage,
  })

  return mutate
}
