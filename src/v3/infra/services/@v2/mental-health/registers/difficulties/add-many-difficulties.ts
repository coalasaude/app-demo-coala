import apiRequest from '../../../../api'

export interface AddManyMentalHealthDifficultiesParams {
  userId: number
  difficulties: {
    title: string
    name: string
    description: string
  }[]
}

export async function addManyMentalHealthDifficulties({
  userId,
  ...body
}: AddManyMentalHealthDifficultiesParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/mental-health/records/challenge',
    body: { challenges: body.difficulties },
    pathParams: { userId },
  })
}
