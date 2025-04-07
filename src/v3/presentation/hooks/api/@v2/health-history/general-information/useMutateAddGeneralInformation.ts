import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { addGeneralInformation } from '@/v3/infra/services/@v2/health-history/general-information/add-general-information'

import { useMutate } from '../../@shared/useMutate'

export const useMutateAddGeneralInformation = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addGeneralInformation,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.GENERAL_INFORMATION, variables.userId],
    onSuccess: () => onSuccessMessage('Informação criada com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
