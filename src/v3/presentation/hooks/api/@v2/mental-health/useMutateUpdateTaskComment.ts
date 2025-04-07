import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { updateTaskComment } from '@/v3/infra/services/@v2/mental-health/learning/update-task-comment'

import { useMutate } from '../@shared/useMutate'

export const useMutateUpdateTaskComment = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: updateTaskComment,
    invalidateQueryKey: [QueryKeyEnum.MENTAL_HEALTH_PEI_PDI_COMMENT],
    onSuccess: () => {
      onSuccessMessage('Comentário editado com sucesso')
    },
    onError: onErrorMessage,
  })

  return mutate
}
