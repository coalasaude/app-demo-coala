import { addImageUser } from '@/v3/infra/services/@v2/users/users/add-image-user'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'

import { useMutate } from '../../@shared/useMutate'

export const useMutateAddUserImage = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addImageUser,
    invalidateQueryKey: [QueryKeyEnum.USER],
    onSuccess: (data) => {
      onSuccessMessage('Imagem cadastrada com sucesso')
      return data
    },
    onError: onErrorMessage,
  })

  return mutate
}
