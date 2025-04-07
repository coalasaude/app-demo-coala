import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { addHistorySickNote } from '@/v3/infra/services/@v2/health-history/sick-note/add-sick-note'

import { useMutate } from '../../@shared/useMutate'

export const useMutateAddHistorySickNote = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addHistorySickNote,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.HISTORY_SICKNOTE, variables.userId],
    onSuccess: () => onSuccessMessage('Atestado criado com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
