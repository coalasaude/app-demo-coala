import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { unlinkRoles } from '@/v3/infra/services/@v2/users/roles/unlink-roles'

import { useMutate } from '../../@shared/useMutate'

export const useMutateUnlinkRoles = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: unlinkRoles,
    invalidateQueryKey: () => [QueryKeyEnum.USER],
    onSuccess: () => onSuccessMessage('Perfis desvinculados com sucesso!'),
    onError: onErrorMessage,
  })

  return mutate
}
