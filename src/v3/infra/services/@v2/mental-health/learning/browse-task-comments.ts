import apiRequest from '@/services/api'
import {
  BrowseTaskComment,
  BrowseTaskCommentConstructor,
} from '@/v3/domain/@v2/mental-health/learning/browse-task-comments'

type Params = {
  taskId: number
  userId: number
}

type BrowseTaskCommentResponse = BrowseTaskCommentConstructor

export async function browseTaskComments(params: Params) {
  const { data, pagination } = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/mental-health/tasks/:taskId/comment',
    pathParams: { userId: params.userId, taskId: params.taskId },
  })) as BrowseTaskCommentResponse

  return new BrowseTaskComment({ pagination, data })
}
