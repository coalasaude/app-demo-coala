import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { browseTaskCommentReplies } from '@/v3/infra/services/@v2/mental-health/learning/browse-task-comment-replies'

import { useFetch } from '../@shared/useFetch'

type BrowseTaskCommentsParams = {
  commentId: number
  userId: number
}

export const useFetchBrowseTaskCommentReplies = (params: BrowseTaskCommentsParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseTaskCommentReplies(params),
    queryKey: [QueryKeyEnum.MENTAL_HEALTH_PEI_PDI_COMMENT, params],
  })

  return {
    ...response,
    comments: data?.data || [],
    pagination: data?.pagination,
  }
}
