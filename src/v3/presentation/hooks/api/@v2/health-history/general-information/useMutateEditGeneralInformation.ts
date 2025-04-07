import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { editGeneralInformation } from '@/v3/infra/services/@v2/health-history/general-information/edit-general-information'

import { useMutate } from '../../@shared/useMutate'

export const useMutateEditGeneralInformation = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: editGeneralInformation,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.GENERAL_INFORMATION, variables.userId],
    onSuccess: () => onSuccessMessage('Informação atualizada com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
