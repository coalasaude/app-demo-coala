import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { deleteReport } from '@/v3/infra/services/@v2/appointment/report/delete-report'

import { useMutate } from '../../@shared/useMutate'

export const useMutateDeleteReport = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: deleteReport,
    invalidateManyQueryKeys: (_, variables) => [
      [QueryKeyEnum.TIMELINE],
      [QueryKeyEnum.APPOINTMENT_REPORT, variables.appointmentId, variables.reportId],
    ],
    onSuccess: () => onSuccessMessage('Relatório invalidado com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
