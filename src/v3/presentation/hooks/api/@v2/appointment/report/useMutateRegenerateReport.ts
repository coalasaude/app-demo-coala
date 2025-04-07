import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { regenerateReport } from '@/v3/infra/services/@v2/appointment/report/regenerate-report'

import { useMutate } from '../../@shared/useMutate'

export const useMutateRegenerateReport = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: regenerateReport,
    invalidateManyQueryKeys: (_, variables) => [
      [QueryKeyEnum.TIMELINE],
      [QueryKeyEnum.APPOINTMENT_REPORT, variables.appointmentId, variables.reportId],
    ],
    onSuccess: () => onSuccessMessage('Relatório regerado com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
