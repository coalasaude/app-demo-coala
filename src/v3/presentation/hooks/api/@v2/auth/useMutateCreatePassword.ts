import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { createPassword } from '@/v3/infra/services/@v2/auth/create-password'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'

import { useMutate } from '../@shared/useMutate'

export const useMutateCreatePassword = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: createPassword,
    invalidateQueryKey: [QueryKeyEnum.USER],
    onSuccess: () => {
      onSuccessMessage('Senha criada com sucesso')
    },
    onError: onErrorMessage,
  })

  return mutate
}
