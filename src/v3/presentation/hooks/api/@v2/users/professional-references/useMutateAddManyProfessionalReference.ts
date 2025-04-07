import { addManyProfessionalReference } from '@/v3/infra/services/@v2/users/professional-references/add-many-professional-reference'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'

import { useMutate } from '../../@shared/useMutate'

export const useMutateAddManyProfessionalReference = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addManyProfessionalReference,
    invalidateQueryKey: (_, variables) => [
      QueryKeyEnum.PROFESSIONAL_REFERENCE,
      variables[0]?.userId,
    ],
    onSuccess: () => onSuccessMessage('Profissionais da saúde criados com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
