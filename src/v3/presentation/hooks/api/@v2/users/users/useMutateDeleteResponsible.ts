import { deleteResponsibleUser } from '@/v3/infra/services/@v2/users/users/delete-responsible'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'

import { useMutate } from '../../@shared/useMutate'

export const useMutateDeleteResponsible = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: deleteResponsibleUser,
    invalidateQueryKey: [QueryKeyEnum.USER],
    onSuccess: (data) => {
      onSuccessMessage('Responsável removido com sucesso')
      return data
    },
    onError: onErrorMessage,
  })

  return mutate
}
