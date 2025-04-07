import { changeStatusAppointment } from '@/v3/infra/services/@v2/appointment/appointment/change-status-appointment'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { extractApiError } from '@/v3/utils/extract-api-error'

import { useMutate } from '../../@shared/useMutate'

export const useMutateChangeStatusAppointment = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: changeStatusAppointment,
    invalidateQueryKey: [QueryKeyEnum.APPOINTMENT],
    onSuccess: () => onSuccessMessage('Status editado com sucesso'),
    onError: onErrorMessage,
  })

  const errorMessage: string | null = mutate.error ? extractApiError(mutate.error) : null

  return { ...mutate, errorMessage }
}
