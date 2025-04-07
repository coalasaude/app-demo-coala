import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { deletePrescription } from '@/v3/infra/services/@v2/appointment/prescription/delete-prescription'

import { useMutate } from '../../@shared/useMutate'

export const useMutateDeletePrescription = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: deletePrescription,
    invalidateManyQueryKeys: (_, variables) => [
      [QueryKeyEnum.TIMELINE],
      [QueryKeyEnum.MEDICINE],
      [QueryKeyEnum.APPOINTMENT_PRESCRIPTION, variables.appointmentId, variables.prescriptionId],
    ],
    onSuccess: () => onSuccessMessage('Receituário invalidado com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
