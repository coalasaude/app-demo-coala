import { addDiagnose } from '@/v3/infra/services/@v2/appointment/diagnose/add-diagnose'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { extractApiError } from '@/v3/utils/extract-api-error'

import { useMutate } from '../../@shared/useMutate'

export const useMutateAddDiagnose = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addDiagnose,
    invalidateManyQueryKeys: (_, variables) => [
      [QueryKeyEnum.TIMELINE],
      [QueryKeyEnum.DISEASE],
      [QueryKeyEnum.APPOINTMENT_DIAGNOSE, variables.appointmentId],
    ],
    onSuccess: () => onSuccessMessage('Diagnóstico criado com sucesso'),
    onError: onErrorMessage,
  })

  const errorMessage: string | null = mutate.error ? extractApiError(mutate.error) : null

  return { ...mutate, errorMessage }
}
