import { addAddress } from '@/v3/infra/services/@v2/users/users/add-address'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'

import { useMutate } from '../../@shared/useMutate'

export const useMutateAddAddress = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addAddress,
    invalidateQueryKey: [QueryKeyEnum.USER, QueryKeyEnum.ADDRESS],
    onSuccess: () => {
      onSuccessMessage('Endereço adicionado com sucesso')
    },
    onError: onErrorMessage,
  })

  return mutate
}
