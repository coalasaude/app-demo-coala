import { addAttachment } from '@/v3/infra/services/appointment/records/attachments'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useMutate } from '../../@v2/@shared/useMutate'
import { useApiResponseHandler } from '../../../useApiResponseHandler'

export function useMutateAddAttachment() {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addAttachment,
    invalidateQueryKey: [QueryKeyEnum.TIMELINE],
    onSuccess: () => {
      onSuccessMessage('Anexo cadastrado com sucesso')
    },
    onError: onErrorMessage,
  })

  return mutate
}
