import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { linkInstitution } from '@/v3/infra/services/@v2/health-units/institution/link-institution'

import { useMutate } from '../../@shared/useMutate'

export const useMutateLinkInstitution = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: linkInstitution,
    invalidateQueryKey: [QueryKeyEnum.HEALTH_UNIT_INSTITUTIONS],
    onSuccess: () => {
      onSuccessMessage('Instituição vinculada com sucesso')
    },
    onError: onErrorMessage,
  })

  return mutate
}
