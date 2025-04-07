import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { regenerateSickNote } from '@/v3/infra/services/@v2/appointment/sick-note/regenerate-sick-note'

import { useMutate } from '../../@shared/useMutate'

export const useMutateRegenerateSickNote = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: regenerateSickNote,
    invalidateManyQueryKeys: (_, variables) => [
      [QueryKeyEnum.TIMELINE],
      [QueryKeyEnum.HISTORY_SICKNOTE],
      [QueryKeyEnum.APPOINTMENT_SICK_NOTE, variables.appointmentId, variables.sickNoteId],
    ],
    onSuccess: () => onSuccessMessage('Atestado regerado com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
