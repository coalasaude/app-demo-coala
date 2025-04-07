import apiRequest from '../../../../api'

export interface DeleteMentalHealthExternalRegisterParams {
  id: number
  userId: number
}

export async function deleteMentalHealthExternalRegister({
  id,
  userId,
}: DeleteMentalHealthExternalRegisterParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/users/:userId/mental-health/records/external-record/:id',
    pathParams: { userId, id },
  })
}
