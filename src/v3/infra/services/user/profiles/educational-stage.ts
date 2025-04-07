import { ApiEducationalStage } from '@/v3/domain/api/ApiEducationalStage'

import apiRequest from '../../api'

export const getEducationalStage = () => {
  return apiRequest<ApiEducationalStage[]>({
    path: 'user/profiles/educational-stage',
    method: 'GET',
    throwError: true,
  })
}
