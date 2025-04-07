import { TApiUserFirstFillsGetResponse } from '@/v3/domain/api/ApiUserFirstFillsGetResponse'

import apiRequest from './api'

export interface GetAccessApiProps {
  permission: string | string[]
  dependentPermission?: string
}

export const getAccess = ({ permission, dependentPermission }: GetAccessApiProps) =>
  apiRequest<TApiUserFirstFillsGetResponse>({
    method: 'GET',
    throwError: true,
    path: `me/access`,
    queryParams: {
      permission: permission,
      dependent_permission: dependentPermission,
    },
  })
