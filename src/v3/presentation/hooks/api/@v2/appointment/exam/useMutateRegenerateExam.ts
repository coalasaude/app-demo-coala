import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { regenerateExam } from '@/v3/infra/services/@v2/appointment/exam/regenerate-exam'

import { useMutate } from '../../@shared/useMutate'

export const useMutateRegenerateExam = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: regenerateExam,
    invalidateManyQueryKeys: (_, variables) => [
      [QueryKeyEnum.TIMELINE],
      [QueryKeyEnum.APPOINTMENT_EXAM, variables.appointmentId, variables.examId],
    ],
    onSuccess: () => onSuccessMessage('Exame regerado com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
