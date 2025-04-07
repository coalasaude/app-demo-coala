import { UserModel, UserModelConstructor } from '@/v3/domain/@v2/users/users.model'

import apiRequest from '../../../api'

export type ReadUserResponse = UserModelConstructor

export interface ReadUserParams {
  userId?: number
}

export async function readUser({ userId }: ReadUserParams) {
  const data = (await apiRequest<ReadUserResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId',
    pathParams: { userId },
  })) as ReadUserResponse

  return new UserModel(data)
}
