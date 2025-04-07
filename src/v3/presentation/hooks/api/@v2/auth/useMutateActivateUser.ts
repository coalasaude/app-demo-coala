import { activateUser } from '@/v3/infra/services/@v2/auth/activate-user'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useMutate } from '../@shared/useMutate'
import { useApiResponseHandler } from '../../../useApiResponseHandler'

export const useMutateActivateUser = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: activateUser,
    invalidateQueryKey: [QueryKeyEnum.USER],
    onError: onErrorMessage,
    onSuccess: () => {
      onSuccessMessage('Usuário ativado com sucesso')
    },
  })

  return mutate
}
