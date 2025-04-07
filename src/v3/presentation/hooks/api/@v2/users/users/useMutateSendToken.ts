import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { sendCode } from '@/v3/infra/services/@v2/auth/send-code'

import { useMutate } from '../../@shared/useMutate'

export const useMutateSendToken = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: sendCode,
    invalidateQueryKey: [QueryKeyEnum.USER],
    onSuccess: () => {
      onSuccessMessage('Token enviado com sucesso!')
    },
    onError: onErrorMessage,
  })

  return mutate
}
