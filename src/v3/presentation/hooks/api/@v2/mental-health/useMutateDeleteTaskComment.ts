import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { deleteTaskComment } from '@/v3/infra/services/@v2/mental-health/learning/delete-task-comment'

import { useMutate } from '../@shared/useMutate'

export const useMutateDeleteTaskComment = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: deleteTaskComment,
    invalidateQueryKey: [QueryKeyEnum.MENTAL_HEALTH_PEI_PDI_COMMENT],
    onSuccess: () => onSuccessMessage('Comentário deletado com sucesso'),
    onError: onErrorMessage,
  })

  return mutate
}
