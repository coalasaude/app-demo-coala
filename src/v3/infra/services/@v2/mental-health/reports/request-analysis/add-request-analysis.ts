import apiRequest from '../../../../api'

export interface AddMentalHealthRequestAnalysisParams {
  reason: string
  userId: number
}

export async function addMentalHealthRequestAnalysis({
  userId,
  ...body
}: AddMentalHealthRequestAnalysisParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/mental-health/requested-analysis',
    body: body,
    pathParams: { userId },
  })
}
