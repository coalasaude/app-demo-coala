import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { toggleInstitutionStatus } from '@/v3/infra/services/organizations/institution'
import { extractApiError } from '@/v3/utils/extract-api-error'

import { useApiResponseHandler } from '../../../useApiResponseHandler'
import { useMutate } from '../../@v2/@shared/useMutate'

export const useMutateToggleInstitutionStatus = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: toggleInstitutionStatus,
    invalidateQueryKey: [QueryKeyEnum.COST_CENTER_INSTITUTION],
    onSuccess: () => onSuccessMessage('Status da instituição alterado com sucesso'),
    onError: onErrorMessage,
  })

  const errorMessage: string | null = mutate.error ? extractApiError(mutate.error) : null

  return {
    ...mutate,
    errorMessage,
  }
}
