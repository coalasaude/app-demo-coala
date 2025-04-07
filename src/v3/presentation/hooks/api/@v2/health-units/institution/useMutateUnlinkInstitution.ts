import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { unlinkInstitution } from '@/v3/infra/services/@v2/health-units/institution/unlink-institution'

import { useMutate } from '../../@shared/useMutate'

export const useMutateUnlinkInstitution = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: unlinkInstitution,
    invalidateQueryKey: [QueryKeyEnum.HEALTH_UNIT_INSTITUTIONS],
    onSuccess: () => {
      onSuccessMessage('Instituição removida com sucesso')
    },
    onError: onErrorMessage,
  })

  return mutate
}
