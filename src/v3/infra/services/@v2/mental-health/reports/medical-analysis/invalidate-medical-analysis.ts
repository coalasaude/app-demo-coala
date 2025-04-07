import apiRequest from '../../../../api'

export interface EditMentalHealthMedicalAnalysisParams {
  id: number
  userId: number
}

export async function invalidateMentalHealthMedicalAnalysis({
  id,
  userId,
}: EditMentalHealthMedicalAnalysisParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/users/:userId/mental-health/medical-analysis/:id',
    pathParams: { userId, id },
  })
}
