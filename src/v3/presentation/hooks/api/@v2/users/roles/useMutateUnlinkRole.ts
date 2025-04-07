import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { unlinkRole } from '@/v3/infra/services/@v2/users/roles/unlink-role'

import { useMutate } from '../../@shared/useMutate'

export const useMutateUnlinkRole = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: unlinkRole,
    invalidateQueryKey: () => [QueryKeyEnum.USER],
    onSuccess: () => onSuccessMessage('Perfil desvinculado com sucesso!'),
    onError: onErrorMessage,
  })

  return mutate
}
