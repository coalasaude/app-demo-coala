import apiRequest from '../../../../api'

export interface DeleteMentalHealthBehaviorParams {
  id: number
  userId: number
}

export async function deleteMentalHealthBehavior({ id, userId }: DeleteMentalHealthBehaviorParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/users/:userId/mental-health/records/behaviour/:id',
    pathParams: { userId, id },
  })
}
