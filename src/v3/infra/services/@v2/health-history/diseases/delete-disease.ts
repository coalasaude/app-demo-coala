import apiRequest from '../../../api'

export interface DeleteUserDiseaseParams {
  diseaseId: number
  userId: number
}

export async function deleteDisease({ userId, diseaseId }: DeleteUserDiseaseParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/users/:userId/health-history/diseases/:diseaseId',
    pathParams: { userId, diseaseId },
  })
}
