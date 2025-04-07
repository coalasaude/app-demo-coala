import { ApiCompanyPosition } from '@/v3/domain/api/ApiCompanyPosition'

import apiRequest from '../../api'

export const getCompanyPosition = () => {
  return apiRequest<ApiCompanyPosition[]>({
    path: 'user/profiles/company-position',
    method: 'GET',
    throwError: true,
  })
}
