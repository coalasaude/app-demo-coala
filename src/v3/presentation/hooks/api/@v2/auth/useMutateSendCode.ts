import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { sendCode } from '@/v3/infra/services/@v2/auth/send-code'

import { useMutate } from '../@shared/useMutate'

export const useMutateSendCode = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: sendCode,
    invalidateQueryKey: [],
    onSuccess: () => {
      onSuccessMessage('Código enviado com sucesso')
    },
    onError: onErrorMessage,
  })

  return mutate
}
