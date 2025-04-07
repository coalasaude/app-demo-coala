import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { regeneratePrescription } from '@/v3/infra/services/@v2/appointment/prescription/regenerate-prescription'

import { useMutate } from '../../@shared/useMutate'

export const useMutateRegeneratePrescription = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: regeneratePrescription,
    invalidateManyQueryKeys: (_, variables) => [
      [QueryKeyEnum.TIMELINE],
      [QueryKeyEnum.MEDICINE],
      [QueryKeyEnum.APPOINTMENT_PRESCRIPTION, variables.appointmentId, variables.prescriptionId],
    ],
    onSuccess: () => onSuccessMessage('Receituário regerado com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
