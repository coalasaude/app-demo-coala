import { AddressModel, AddressModelConstructor } from '@/v3/domain/@v2/users/address.model'

import apiRequest from '../../../api'

import { ReadUserParams } from './read-user'

export type ReadAddressResponse = AddressModelConstructor

export async function readAddress({ userId }: ReadUserParams) {
  const data = (await apiRequest<ReadAddressResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/addresses',
    pathParams: { userId },
  })) as ReadAddressResponse

  if (!data) return null
  return new AddressModel(data)
}
