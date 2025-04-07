import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { verifyEditLoginUser } from '@/v3/infra/services/@v2/users/users/verify-edit-login-user'

import { useMutate } from '../../@shared/useMutate'

export const useMutateVerifyEditLoginUser = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: verifyEditLoginUser,
    invalidateQueryKey: [QueryKeyEnum.USER],
    onSuccess: () => {
      onSuccessMessage('Usuário editado com sucesso')
    },
    onError: onErrorMessage,
  })

  return mutate
}
