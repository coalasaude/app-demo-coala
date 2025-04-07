import apiRequest from '../../../api'

export interface AddAllergyParams {
  otherCategory?: string
  userId: number
  categoryId: number
  causerAgent: string
  symptoms: number[]
  orientations?: string
}

export async function addAllergy({ userId, ...params }: AddAllergyParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/health-history/allergy',
    body: params,
    pathParams: { userId },
  })
}
