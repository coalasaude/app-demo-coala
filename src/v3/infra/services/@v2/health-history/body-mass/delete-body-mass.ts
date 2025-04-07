import apiRequest from '../../../api'

export interface DeleteBodyMassParams {
  userId: number
  id: number
}

export async function deleteBodyMass({ userId, id }: DeleteBodyMassParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/users/:userId/health-history/body-mass/:id',
    pathParams: { userId, id },
  })
}
