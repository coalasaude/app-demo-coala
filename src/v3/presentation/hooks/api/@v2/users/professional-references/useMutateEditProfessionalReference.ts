import { editProfessionalReference } from '@/v3/infra/services/@v2/users/professional-references/edit-professional-reference'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'

import { useMutate } from '../../@shared/useMutate'

export const useMutateEditProfessionalReference = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: editProfessionalReference,
    invalidateQueryKey: (_, variables) => [QueryKeyEnum.PROFESSIONAL_REFERENCE, variables.userId],
    onSuccess: () => onSuccessMessage('Profissional da saúde editado com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
