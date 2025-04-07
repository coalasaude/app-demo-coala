import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { linkRole } from '@/v3/infra/services/@v2/users/roles/link-role'

import { useMutate } from '../../@shared/useMutate'

export const useMutateLinkRole = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: linkRole,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.USER, variables.userId],
    onSuccess: () => onSuccessMessage('Perfil vinculado com sucesso!'),
    onError: onErrorMessage,
  })

  return mutate
}
