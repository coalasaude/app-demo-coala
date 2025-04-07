import apiRequest from '../../../../api'

export interface AddManyMentalHealthCoalaRegisterParams {
  userId: number
  coalaRegisters: {
    title: string
    description: string
    documentId?: number | null
  }[]
}

export async function addManyMentalHealthCoalaRegister({
  userId,
  ...body
}: AddManyMentalHealthCoalaRegisterParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/mental-health/records/intern-records',
    body: {
      internRecords: body.coalaRegisters,
    },
    pathParams: { userId },
  })
}
