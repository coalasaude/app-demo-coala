import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { addManyAllergy } from '@/v3/infra/services/@v2/health-history/allergies/add-many-allergy'

import { useMutate } from '../../@shared/useMutate'

export const useMutateAddManyAllergy = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addManyAllergy,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.ALLERGY, variables.userId],
    onSuccess: () => onSuccessMessage('Alergias criadas com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
