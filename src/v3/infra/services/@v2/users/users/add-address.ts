import apiRequest from '../../../api'

export interface AddUserAddressParams {
  userId: number
  zipCode: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
}

export async function addAddress({ userId, ...params }: AddUserAddressParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/addresses',
    body: params,
    pathParams: { userId },
  })
}
