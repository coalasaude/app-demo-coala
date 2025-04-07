import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { deleteAllergy } from '@/v3/infra/services/@v2/health-history/allergies/delete-allergy'

import { useMutate } from '../../@shared/useMutate'

export const useMutateDeleteAllergy = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: deleteAllergy,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.ALLERGY, variables.userId],
    onSuccess: () => onSuccessMessage('Alergia deletada com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
