import apiRequest from '@/services/api'
import {
  BrowseTaskComment,
  BrowseTaskCommentConstructor,
} from '@/v3/domain/@v2/mental-health/learning/browse-task-comments'

type Params = {
  commentId: number
  userId: number
}

type BrowseTaskCommentResponse = BrowseTaskCommentConstructor

export async function browseTaskCommentReplies(params: Params) {
  const { data, pagination } = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/mental-health/comments/:commentId/replies',
    pathParams: { userId: params.userId, commentId: params.commentId },
  })) as BrowseTaskCommentResponse

  return new BrowseTaskComment({ pagination, data })
}
