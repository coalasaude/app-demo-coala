import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { extractApiError } from '@/v3/utils/extract-api-error'
import { exportUsers } from '@/v3/infra/services/@v2/users/export-user/export-user'

import { useMutate } from '../../@shared/useMutate'

export const useMutateExportUsers = () => {
  const { onErrorMessage, onInfoMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: exportUsers,
    invalidateQueryKey: [],
    onSuccess: () =>
      onInfoMessage(
        'Os dados dos usuários estão sendo exportados e você receberá um e-mail com os arquivos.'
      ),
    onError: onErrorMessage,
  })

  const errorMessage: string | null = mutate.error ? extractApiError(mutate.error) : null

  return { ...mutate, errorMessage }
}
