import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { regenerateMedicalRecord } from '@/v3/infra/services/@v2/appointment/medical-record/regenerate-medical-record'

import { useMutate } from '../../@shared/useMutate'

export const useMutateRegenerateMedicalRecord = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: regenerateMedicalRecord,
    invalidateManyQueryKeys: (_, variables) => [
      [QueryKeyEnum.TIMELINE],
      [QueryKeyEnum.APPOINTMENT_MEDICAL_RECORD, variables.appointmentId],
    ],
    onSuccess: () => onSuccessMessage('Pronto atendimento regerado com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
