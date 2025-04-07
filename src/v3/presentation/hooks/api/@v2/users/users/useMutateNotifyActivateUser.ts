import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { notifyActivateUser } from '@/v3/infra/services/@v2/users/users/notify-activate-user'

import { useMutate } from '../../@shared/useMutate'

export const useMutateNotifyActivateUser = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: notifyActivateUser,
    invalidateQueryKey: [QueryKeyEnum.USER],
    onSuccess: () => {
      onSuccessMessage('O usuário foi notificado com sucesso')
    },
    onError: onErrorMessage,
  })

  return mutate
}
