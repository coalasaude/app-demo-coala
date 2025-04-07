import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { extractApiError } from '@/v3/utils/extract-api-error'
import { notifyAccountActivationRequest } from '@/v3/infra/services/@v2/communications/onboarding/activate-accounts'

import { useMutate } from '../../@shared/useMutate'

export const useMutateNotifyActivateAccountsRequest = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: notifyAccountActivationRequest,
    invalidateQueryKey: [],
    onSuccess: () => onSuccessMessage('Notificações de ativação enviada com sucesso'),
    onError: onErrorMessage,
  })

  const errorMessage: string | null = mutate.error ? extractApiError(mutate.error) : null

  return { ...mutate, errorMessage }
}
