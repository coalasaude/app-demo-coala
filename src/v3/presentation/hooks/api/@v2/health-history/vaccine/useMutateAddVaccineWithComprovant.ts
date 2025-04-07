import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { addVaccineWithComprovant } from '@/v3/infra/services/@v2/health-history/vaccine/add-vaccine-with-comprovant'

import { useMutate } from '../../@shared/useMutate'

export const useMutateAddVaccineWithComprovant = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addVaccineWithComprovant,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.USER_VACCINE, variables.userId],
    onSuccess: () => onSuccessMessage('Vacina criada com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
