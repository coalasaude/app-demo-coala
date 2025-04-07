import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { addMedicalRecord } from '@/v3/infra/services/@v2/appointment/medical-record/add-medical-record'
import { extractApiError } from '@/v3/utils/extract-api-error'

import { useMutate } from '../../@shared/useMutate'

export const useMutateAddMedicalRecord = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addMedicalRecord,
    invalidateManyQueryKeys: (_, variables) => [
      [QueryKeyEnum.TIMELINE],
      [QueryKeyEnum.APPOINTMENT_MEDICAL_RECORD, variables.appointmentId],
      [QueryKeyEnum.DISEASE],
      [QueryKeyEnum.APPOINTMENT_DIAGNOSE, variables.appointmentId],
    ],
    onSuccess: () => onSuccessMessage('Pronto atendimento criado com sucesso'),
    onError: onErrorMessage,
  })

  const errorMessage: string | null = mutate.error ? extractApiError(mutate.error) : null

  return { ...mutate, errorMessage }
}
