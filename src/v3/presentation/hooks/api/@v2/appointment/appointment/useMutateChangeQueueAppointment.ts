import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { extractApiError } from '@/v3/utils/extract-api-error'
import { changeQueueAppointment } from '@/v3/infra/services/@v2/appointment/appointment/change-queue-appointment'

import { useMutate } from '../../@shared/useMutate'

export const useMutateChangeQueueAppointment = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: changeQueueAppointment,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.APPOINTMENT, variables.appointmentId],
    onSuccess: () => onSuccessMessage('Fila de atendimento alterada com sucesso'),
    onError: onErrorMessage,
  })

  const errorMessage: string | null = mutate.error ? extractApiError(mutate.error) : null

  return { ...mutate, errorMessage }
}
