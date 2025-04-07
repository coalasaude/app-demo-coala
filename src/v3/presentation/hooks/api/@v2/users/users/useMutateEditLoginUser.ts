import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { editLoginUser } from '@/v3/infra/services/@v2/users/users/edit-login-user'

import { useMutate } from '../../@shared/useMutate'

export const useMutateEditLoginUser = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: editLoginUser,
    invalidateQueryKey: [QueryKeyEnum.USER],
    onSuccess: () => {
      onSuccessMessage('Usuário editado com sucesso')
    },
    onError: onErrorMessage,
  })

  return mutate
}
