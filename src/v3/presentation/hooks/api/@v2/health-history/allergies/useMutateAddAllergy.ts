import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { addAllergy } from '@/v3/infra/services/@v2/health-history/allergies/add-allergy'

import { useMutate } from '../../@shared/useMutate'

export const useMutateAddAllergy = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addAllergy,
    invalidateManyQueryKeys: (_, variables) => [[QueryKeyEnum.ALLERGY, variables.userId], [QueryKeyEnum.APPOINTMENT]],
    onSuccess: () => onSuccessMessage('Alergia criada com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
