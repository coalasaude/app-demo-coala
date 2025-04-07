import { AccessModel, AccessModelConstructor } from '@/v3/domain/@v2/users/access.model'

import apiRequest from '../../api'

export interface GetAccessApiProps {
  permission: string | string[]
  dependentPermission?: string
}

export async function getAccess({ permission, dependentPermission }: GetAccessApiProps) {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: `v2/access`,
    queryParams: {
      permission: permission,
      dependent_permission: dependentPermission,
    },
  })) as AccessModelConstructor

  return new AccessModel(data)
}
