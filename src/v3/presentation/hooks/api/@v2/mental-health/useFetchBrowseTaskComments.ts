import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { browseTaskComments } from '@/v3/infra/services/@v2/mental-health/learning/browse-task-comments'

import { useFetch } from '../@shared/useFetch'

type BrowseTaskCommentsParams = {
  taskId: number
  userId: number
}

export const useFetchBrowseTaskComments = (params: BrowseTaskCommentsParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseTaskComments(params),
    queryKey: [QueryKeyEnum.MENTAL_HEALTH_PEI_PDI_COMMENT, params],
  })

  return {
    ...response,
    comments: data?.data || [],
    pagination: data?.pagination,
  }
}
