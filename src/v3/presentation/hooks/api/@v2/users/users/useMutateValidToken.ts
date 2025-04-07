import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { verifyCode } from '@/v3/infra/services/@v2/auth/verify-code'

import { useMutate } from '../../@shared/useMutate'

export const useMutateValidToken = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: verifyCode,
    invalidateQueryKey: [QueryKeyEnum.USER],
    onSuccess: () => {
      onSuccessMessage('Usuário editado com sucesso')
    },
    onError: onErrorMessage,
  })

  return mutate
}
