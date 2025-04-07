import { ApiSchoolGrade } from '@/v3/domain/api/ApiSchoolGrade'

import apiRequest from '../../api'

export const getSchoolGrade = (query?: { educationalStageId?: number }) => {
  return apiRequest<ApiSchoolGrade[]>({
    path: 'user/profiles/school-grade',
    method: 'GET',
    throwError: true,
    queryParams: {
      educationalStageId: query?.educationalStageId,
    },
  })
}
