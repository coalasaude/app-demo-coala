import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { deleteAttachment } from '@/v3/infra/services/@v2/appointment/attachment/delete-attachment'

import { useMutate } from '../../@shared/useMutate'

export const useMutateDeleteAttachment = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: deleteAttachment,
    invalidateManyQueryKeys: (_, variables) => [
      [QueryKeyEnum.TIMELINE],
      [QueryKeyEnum.APPOINTMENT_ATTACHMENT, variables.appointmentId, variables.attachmentId],
    ],
    onSuccess: () => onSuccessMessage('Anexo invalidado com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
