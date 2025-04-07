import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { invalidateRecord } from '@/v3/infra/services/records'

import { useMutate } from '../@v2/@shared/useMutate'

export const useMutateInvalidateRecord = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: invalidateRecord,
    invalidateQueryKey: [QueryKeyEnum.TIMELINE],
    onSuccess: () => {
      onSuccessMessage('Registro invalidado com sucesso')
    },
    onError: onErrorMessage,
  })

  return mutate
}
