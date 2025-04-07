import apiRequest from '@/services/api'

type Params = { userId: number; commentId: number }

export async function addLikeComment(params: Params) {
  const sub = await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/mental-health/comments/:commentId/like',
    pathParams: { userId: params.userId, commentId: params.commentId },
    body: params,
  })

  return sub
}
