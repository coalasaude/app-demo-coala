import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { postSickNote } from '@/v3/infra/services/appointment/records/sicknotes'

import { useMutate } from '../../@v2/@shared/useMutate'
import { useApiResponseHandler } from '../../../useApiResponseHandler'

export function useMutateAddSickNote() {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: postSickNote,
    invalidateQueryKey: [QueryKeyEnum.TIMELINE],
    onSuccess: () => {
      onSuccessMessage('Atestado cadastrado com sucesso')
    },
    onError: onErrorMessage,
  })

  return mutate
}
