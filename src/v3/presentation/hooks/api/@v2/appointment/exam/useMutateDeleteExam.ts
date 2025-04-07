import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { deleteExam } from '@/v3/infra/services/@v2/appointment/exam/delete-exam'

import { useMutate } from '../../@shared/useMutate'

export const useMutateDeleteExam = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: deleteExam,
    invalidateManyQueryKeys: (_, variables) => [
      [QueryKeyEnum.TIMELINE],
      [QueryKeyEnum.APPOINTMENT_EXAM, variables.appointmentId, variables.examId],
    ],
    onSuccess: () => onSuccessMessage('Exame invalidado com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
