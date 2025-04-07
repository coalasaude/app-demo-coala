import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { editRoleHealthLeaderRole } from '@/v3/infra/services/@v2/users/roles/edit-role-health-leader'

import { useMutate } from '../../@shared/useMutate'

export const useMutateEditRoleHealthLeader = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: editRoleHealthLeaderRole,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.USER, variables.userId],
    onSuccess: () => onSuccessMessage('Lider de saúde editado com sucesso!'),
    onError: onErrorMessage,
  })

  return mutate
}
