import apiRequest from '../../../../api'

export interface DeleteMentalHealthCoalaRegisterParams {
  id: number
  userId: number
}

export async function deleteMentalHealthCoalaRegister({
  id,
  userId,
}: DeleteMentalHealthCoalaRegisterParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/users/:userId/mental-health/records/intern-records/:id',
    pathParams: { userId, id },
  })
}
