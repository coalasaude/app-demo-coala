import apiRequest from '../../../api'

export interface DeleteUserVaccineParams {
  vaccineId: number
  userId: number
}

export async function deleUserVaccine({ userId, vaccineId }: DeleteUserVaccineParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/users/:userId/health-history/vaccine/:vaccineId',
    pathParams: { userId, vaccineId },
  })
}
