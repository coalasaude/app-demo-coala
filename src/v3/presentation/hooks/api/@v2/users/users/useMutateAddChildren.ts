import { addChildren } from '@/v3/infra/services/@v2/users/users/add-children'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { IErrorResp } from '@/types/error.type'

import { useMutate } from '../../@shared/useMutate'

export const useMutateAddChildren = (options?: { errorMessage: string }) => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addChildren,
    invalidateQueryKey: [QueryKeyEnum.USER],
    onSuccess: () => {
      onSuccessMessage('Dependente adicionado com sucesso')
    },
    onError: (error: IErrorResp) => {
      if (options?.errorMessage && !error.response?.data.error) {
        onErrorMessage({
          response: { data: { message: options.errorMessage, error: '' } },
        } as IErrorResp)
        return
      }
      onErrorMessage(error)
    },
  })

  return mutate
}
