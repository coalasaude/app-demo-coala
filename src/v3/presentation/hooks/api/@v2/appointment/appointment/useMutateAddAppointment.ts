import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { addAppointment } from '@/v3/infra/services/@v2/appointment/appointment/add-appointment'
import { extractApiError } from '@/v3/utils/extract-api-error'

import { useMutate } from '../../@shared/useMutate'

export const useMutateAddAppointment = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addAppointment,
    invalidateQueryKey: [QueryKeyEnum.APPOINTMENT],
    onSuccess: () => onSuccessMessage('Atendimento criado com sucesso'),
    onError: onErrorMessage,
  })

  const errorMessage: string | null = mutate.error ? extractApiError(mutate.error) : null

  return { ...mutate, errorMessage }
}
