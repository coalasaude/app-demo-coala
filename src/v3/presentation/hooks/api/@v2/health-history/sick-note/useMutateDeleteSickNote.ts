import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { deleteSickNote } from '@/v3/infra/services/@v2/health-history/sick-note/delete-sick-note'

import { useMutate } from '../../@shared/useMutate'

export const useMutateDeleteHistorySickNote = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: deleteSickNote,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.HISTORY_SICKNOTE, variables.userId],
    onSuccess: () => onSuccessMessage('Atestado deletado com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
