import apiRequest from '../../../../api'

export interface EditMentalHealthRequestAnalysisParams {
  reason: string
  id: number
  userId: number
}

export async function editMentalHealthRequestAnalysis({
  id,
  userId,
  ...body
}: EditMentalHealthRequestAnalysisParams) {
  await apiRequest({
    method: 'PATCH',
    throwError: true,
    path: 'v2/users/:userId/mental-health/requested-analysis/:id',
    body: body,
    pathParams: { userId, id },
  })
}
