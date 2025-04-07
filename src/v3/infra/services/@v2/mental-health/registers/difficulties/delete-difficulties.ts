import apiRequest from '../../../../api'

export interface DeleteMentalHealthDifficultiesParams {
  id: number
  userId: number
}

export async function deleteMentalHealthDifficulties({
  id,
  userId,
}: DeleteMentalHealthDifficultiesParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/users/:userId/mental-health/records/challenge/:id',
    pathParams: { userId, id },
  })
}
