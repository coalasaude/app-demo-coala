import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { deleteTask } from '@/v3/infra/services/@v2/mental-health/learning/delete-task'

import { useMutate } from '../@shared/useMutate'

export const useMutateDeleteTask = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: deleteTask,
    invalidateQueryKey: [QueryKeyEnum.MENTAL_HEALTH_PEI_PDI],
    onSuccess: () => onSuccessMessage('Task deletada com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
