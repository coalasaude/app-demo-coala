import apiRequest from '@/services/api'
import { AddTaskComment } from '@/v3/domain/@v2/mental-health/learning/add-task-comment.model'

type AddTaskCommentResponse = { id: number }

export async function addTaskComment(params: AddTaskComment) {
  const comment = (await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/mental-health/tasks/:taskId/comment',
    pathParams: { userId: params.userId, taskId: params.taskId },
    body: params,
  })) as AddTaskCommentResponse

  return comment
}
