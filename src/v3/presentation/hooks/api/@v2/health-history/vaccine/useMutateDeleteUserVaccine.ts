import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { deleUserVaccine } from '@/v3/infra/services/@v2/health-history/vaccine/delete-user-vaccine'

import { useMutate } from '../../@shared/useMutate'

export const useMutateDeleteUserVaccine = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: deleUserVaccine,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.USER_VACCINE, variables.userId],
    onSuccess: () => onSuccessMessage('Vacina deletada com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
