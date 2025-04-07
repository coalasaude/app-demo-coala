import apiRequest from '@/services/api'

export type DeleteTaskCommentParams = {
  userId: number
  commentId: number
}

export async function deleteTaskComment(params: DeleteTaskCommentParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/users/:userId/mental-health/comment/:commentId',
    pathParams: { userId: params.userId, commentId: params.commentId },
  })
}
