import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { editRole } from '@/v3/infra/services/@v2/users/roles/edit-role'

import { useMutate } from '../../@shared/useMutate'

export const useMutateEditRole = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: editRole,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.USER, variables.userId],
    onSuccess: () => onSuccessMessage('Perfil editado com sucesso!'),
    onError: onErrorMessage,
  })

  return mutate
}
