import { addProfessionalReference } from '@/v3/infra/services/@v2/users/professional-references/add-professional-reference'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'

import { useMutate } from '../../@shared/useMutate'

export const useMutateAddProfessionalReference = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addProfessionalReference,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.PROFESSIONAL_REFERENCE, variables.userId],
    onSuccess: () => onSuccessMessage('Profissional da saúde criado com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
