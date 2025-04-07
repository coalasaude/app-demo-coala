import apiRequest from '../../../../api'

export interface AddDocumentParams {
  documentName: string
  professionalName: string
  professionalRegistrationId: number
  registration: string
  emissionDate: Date
  documentId: number
  userId: number
}

export async function addMentalHealthReport({ userId, ...body }: AddDocumentParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/mental-health/medical-report',
    body: body,
    pathParams: { userId },
  })
}
