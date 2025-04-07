import {
  MePermissions,
  MePermissionsConstructor,
} from '@/v3/domain/@v2/users/user-me-permissions.model'

import apiRequest from '../../api'

export type GetMeOptions = {
  accessToken: string
}

export const getMePermissions = async () => {
  const data = (await apiRequest<MePermissionsConstructor[]>({
    path: 'v2/permissions',
    method: 'GET',
    throwError: true,
    useApiFilters: false,
  })) as MePermissionsConstructor[]
  return data.map((item) => new MePermissions(item))
}
