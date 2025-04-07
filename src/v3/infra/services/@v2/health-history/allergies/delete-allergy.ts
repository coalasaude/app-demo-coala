import apiRequest from '../../../api'

export interface DeleteUserAllergyParams {
  allergyId: number
  userId: number
}

export async function deleteAllergy({ userId, allergyId }: DeleteUserAllergyParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/users/:userId/health-history/allergy/:allergyId',
    pathParams: { userId, allergyId },
  })
}
