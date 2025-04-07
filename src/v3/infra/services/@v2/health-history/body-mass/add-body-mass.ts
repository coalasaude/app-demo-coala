import apiRequest from '../../../api'

export interface AddBodyMassParams {
  userId: number
  weight: number
  height: number
  measurementDate: Date
}

export async function addBodyMass({ userId, ...body }: AddBodyMassParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/health-history/body-mass',
    body,
    pathParams: { userId },
  })
}
