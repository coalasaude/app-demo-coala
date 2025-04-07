import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { extractApiError } from '@/v3/utils/extract-api-error'
import { updateAppointmentComplaint } from '@/v3/infra/services/@v2/appointment/appointment/update-appointment-complaint'

import { useMutate } from '../../@shared/useMutate'

export const useMutateUpdateAppointmentComplaint = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: updateAppointmentComplaint,
    invalidateQueryKey: [QueryKeyEnum.APPOINTMENT],
    onSuccess: () => onSuccessMessage('Adicionado nova queixa com sucesso'),
    onError: onErrorMessage,
  })

  const errorMessage: string | null = mutate.error ? extractApiError(mutate.error) : null

  return { ...mutate, errorMessage }
}
