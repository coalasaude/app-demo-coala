import apiRequest from '@/services/api'

export type MentalHealthTaskCommentParams = {
  userId: number
  commentId: number
  content: string
}

export async function updateTaskComment(params: MentalHealthTaskCommentParams) {
  const userId = Number(params.userId)
  const commentId = Number(params.commentId)

  const task = await apiRequest({
    method: 'PATCH',
    throwError: true,
    path: 'v2/users/:userId/mental-health/comment/:commentId',
    pathParams: { userId, commentId },
    body: params,
  })

  return task
}
