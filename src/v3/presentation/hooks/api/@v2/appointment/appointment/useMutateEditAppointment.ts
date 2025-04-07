import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { editAppointment } from '@/v3/infra/services/@v2/appointment/appointment/edit-appointment'
import { extractApiError } from '@/v3/utils/extract-api-error'

import { useMutate } from '../../@shared/useMutate'

export const useMutateEditAppointment = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: editAppointment,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.APPOINTMENT, variables.appointmentId],
    onSuccess: () => onSuccessMessage('Atendimento editado com sucesso'),
    onError: onErrorMessage,
  })

  const errorMessage: string | null = mutate.error ? extractApiError(mutate.error) : null

  return { ...mutate, errorMessage }
}
