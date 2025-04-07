import apiRequest from '../../../../api'

export interface PublicMentalHealthRequestAnalysisParams {
  id: number
  userId: number
}

export async function publicMentalHealthRequestAnalysis({
  id,
  userId,
  ...body
}: PublicMentalHealthRequestAnalysisParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/mental-health/requested-analysis/:id/publish',
    body: body,
    pathParams: { userId, id },
  })
}
