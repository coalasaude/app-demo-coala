import { addResponsible } from '@/v3/infra/services/@v2/users/users/add-responsible'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'

import { useMutate } from '../../@shared/useMutate'

export const useMutateAddResponsible = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addResponsible,
    invalidateQueryKey: [QueryKeyEnum.USER],
    onSuccess: () => {
      onSuccessMessage('Responsável adicionado com sucesso')
    },
    onError: onErrorMessage,
  })

  return mutate
}
