import apiRequest from '../../../../api'

export interface DeleteDocumentParams {
  id: number
  userId: number
}

export async function deleteMentalHealthReport({ userId, id }: DeleteDocumentParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/users/:userId/mental-health/medical-report/:id',
    pathParams: { userId, id },
  })
}
