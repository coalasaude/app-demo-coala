import apiRequest from '../../../api'

export interface DeleteUserHealthInsuranceParams {
  healthInsuranceId: number
  userId: number
}

export async function deleteHealthInsurance({
  userId,
  healthInsuranceId,
}: DeleteUserHealthInsuranceParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/users/:userId/health-insurances/:healthInsuranceId',
    pathParams: { userId, healthInsuranceId },
  })
}
