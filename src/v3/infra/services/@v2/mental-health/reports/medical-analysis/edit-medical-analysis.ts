import apiRequest from '../../../../api'

export interface EditMentalHealthMedicalAnalysisParams {
  id: number
  analysis: string
  userId: number
}

export async function editMentalHealthMedicalAnalysis({
  id,
  userId,
  ...body
}: EditMentalHealthMedicalAnalysisParams) {
  await apiRequest({
    method: 'PATCH',
    throwError: true,
    path: 'v2/users/:userId/mental-health/medical-analysis/:id',
    body: body,
    pathParams: { userId, id },
  })
}
