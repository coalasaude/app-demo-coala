import apiRequest from '@/services/api'

export type DeletePeiPdiParams = {
  peiPdiId: number
  userId: number
}

export async function deletePeiPdi(params: DeletePeiPdiParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/users/:userId/mental-health/plan/:id',
    pathParams: { userId: params.userId, id: params.peiPdiId },
  })
}
