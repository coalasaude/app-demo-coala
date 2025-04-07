import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { addReport } from '@/v3/infra/services/appointment/records/reports'

import { useMutate } from '../../@v2/@shared/useMutate'
import { useApiResponseHandler } from '../../../useApiResponseHandler'

export function useMutateAddReport() {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addReport,
    invalidateQueryKey: [QueryKeyEnum.TIMELINE],
    onSuccess: () => {
      onSuccessMessage('Relatório cadastrado com sucesso')
    },
    onError: onErrorMessage,
  })

  return mutate
}
