import apiRequest from '../../../../api'

export interface AddManyMentalHealthExternalRegisterParams {
  userId: number
  externalRegisters: {
    title: string
    professionalName: string
    professionalTypeId: number
    professionalRegister: string
    description: string
    documentId: number | null
  }[]
}

export async function addManyMentalHealthExternalRegister({
  userId,
  ...body
}: AddManyMentalHealthExternalRegisterParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/mental-health/records/external-record',
    body: {
      externalRecords: body.externalRegisters.map(
        ({ professionalRegister, professionalTypeId, ...register }) => ({
          ...register,
          register: professionalRegister,
          professionalRegistrationId: professionalTypeId,
        }),
      ),
    },
    pathParams: { userId },
  })
}
