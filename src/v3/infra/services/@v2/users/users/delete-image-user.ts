import apiRequest from '../../../api'

import { ReadUserParams } from './read-user'

export async function deleteImageUser({ userId }: ReadUserParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/users/:userId/images',
    pathParams: { userId },
  })
}
