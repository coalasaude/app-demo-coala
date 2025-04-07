import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { addTaskComment } from '@/v3/infra/services/@v2/mental-health/learning/add-task-comment'

import { useMutate } from '../@shared/useMutate'

export const useMutateAddTaskComment = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addTaskComment,
    invalidateQueryKey: [QueryKeyEnum.MENTAL_HEALTH_PEI_PDI_COMMENT],
    onSuccess: () => onSuccessMessage('Comentário adicionado com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
