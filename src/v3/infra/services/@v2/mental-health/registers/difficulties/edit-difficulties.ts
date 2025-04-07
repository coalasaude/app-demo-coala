import apiRequest from '../../../../api'

export interface EditMentalHealthDifficultiesParams {
  id: number
  userId: number
  title: string
  name: string
  description: string
}

export async function editMentalHealthDifficulties({
  id,
  userId,
  ...body
}: EditMentalHealthDifficultiesParams) {
  await apiRequest({
    method: 'PATCH',
    throwError: true,
    path: 'v2/users/:userId/mental-health/records/challenge/:id',
    body: body,
    pathParams: { userId, id },
  })
}
