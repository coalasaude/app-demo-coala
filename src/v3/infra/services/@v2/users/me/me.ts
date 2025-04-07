import { UserMeModel, UserMeModelConstructor } from '@/v3/domain/@v2/users/user-me.model'

import apiRequest from '../../../api'

export type GetMeOptions = {
  accessToken: string
}

export const getMe = async (options?: GetMeOptions | void) => {
  const data = (await apiRequest<UserMeModelConstructor>({
    path: 'v2/me',
    method: 'GET',
    throwError: true,
    useApiFilters: false,
    ...(options && {
      headers: {
        Authorization: `Bearer ${options.accessToken}`,
      },
    }),
  })) as UserMeModelConstructor
  return new UserMeModel(data)
}
