import { deleteImageUser } from '@/v3/infra/services/@v2/users/users/delete-image-user'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'

import { useMutate } from '../../@shared/useMutate'

export const useMutateDeleteUserImage = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: deleteImageUser,
    invalidateQueryKey: [QueryKeyEnum.USER],
    onSuccess: (data) => {
      onSuccessMessage('Imagem deletada com sucesso')
      return data
    },
    onError: onErrorMessage,
  })

  return mutate
}
