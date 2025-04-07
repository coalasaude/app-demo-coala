import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { deleteDiagnose } from '@/v3/infra/services/@v2/appointment/diagnose/delete-diagnose'

import { useMutate } from '../../@shared/useMutate'

export const useMutateDeleteDiagnose = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: deleteDiagnose,
    invalidateManyQueryKeys: (_, variables) => [
      [QueryKeyEnum.TIMELINE],
      [QueryKeyEnum.DISEASE],
      [QueryKeyEnum.APPOINTMENT_DIAGNOSE, variables.appointmentId, variables.diagnoseId],
    ],
    onSuccess: () => onSuccessMessage('Diagnóstico invalidado com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
