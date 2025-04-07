import apiRequest from '../../../../api'

export interface EditMentalHealthExternalRegisterParams {
  id: number
  userId: number
  title?: string
  professionalName?: string
  professionalTypeId?: number
  professionalRegister?: string
  description?: string
  documentId?: number | null
}

export async function editMentalHealthExternalRegister({
  id,
  userId,
  ...body
}: EditMentalHealthExternalRegisterParams) {
  await apiRequest({
    method: 'PATCH',
    throwError: true,
    path: 'v2/users/:userId/mental-health/records/external-record/:id',
    body: body,
    pathParams: { userId, id },
  })
}
