import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { enableNotificationAppointment } from '@/v3/infra/services/@v2/appointment/appointment/enable-notification'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { extractApiError } from '@/v3/utils/extract-api-error'

import { useMutate } from '../../@shared/useMutate'

export const useMutateEnableNotificationAppointment = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: enableNotificationAppointment,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.APPOINTMENT, variables.appointmentId],
    onSuccess: () => onSuccessMessage('Notificação enviada!'),
    onError: onErrorMessage,
  })

  const errorMessage: string | null = mutate.error ? extractApiError(mutate.error) : null

  return {
    ...mutate,
    errorMessage,
  }
}
