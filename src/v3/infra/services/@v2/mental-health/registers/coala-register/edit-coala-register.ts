import apiRequest from '../../../../api'

export interface EditMentalHealthCoalaRegisterParams {
  id: number
  userId: number
  title?: string
  description?: string
  documentId?: number | null
}

export async function editMentalHealthCoalaRegister({
  id,
  userId,
  ...body
}: EditMentalHealthCoalaRegisterParams) {
  await apiRequest({
    method: 'PATCH',
    throwError: true,
    path: 'v2/users/:userId/mental-health/records/intern-records/:id',
    body: body,
    pathParams: { userId, id },
  })
}
