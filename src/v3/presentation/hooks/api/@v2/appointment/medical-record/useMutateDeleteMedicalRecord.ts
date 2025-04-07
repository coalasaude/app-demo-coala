import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { deleteMedicalRecord } from '@/v3/infra/services/@v2/appointment/medical-record/delete-medical-record'

import { useMutate } from '../../@shared/useMutate'

export const useMutateDeleteMedicalRecord = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: deleteMedicalRecord,
    invalidateManyQueryKeys: (_, variables) => [
      [QueryKeyEnum.TIMELINE],
      [QueryKeyEnum.APPOINTMENT_MEDICAL_RECORD, variables.appointmentId],
    ],
    onSuccess: () => onSuccessMessage('Pronto atendimento invalidado com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
