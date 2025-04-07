import { addAttachment } from '@/v3/infra/services/@v2/appointment/attachment/add-attachment'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { extractApiError } from '@/v3/utils/extract-api-error'

import { useMutate } from '../../@shared/useMutate'

export const useMutateAddAttachment = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addAttachment,
    invalidateManyQueryKeys: (_, variables) => [
      [QueryKeyEnum.TIMELINE],
      [QueryKeyEnum.APPOINTMENT_ATTACHMENT, variables.appointmentId],
    ],
    onSuccess: () => onSuccessMessage('Anexo criado com sucesso'),
    onError: onErrorMessage,
  })

  const errorMessage: string | null = mutate.error ? extractApiError(mutate.error) : null

  return { ...mutate, errorMessage }
}
