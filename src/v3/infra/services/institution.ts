import { TApiInstitutionResponse } from '@/v3/domain/api/ApiInstitutionResponse'

import apiRequest, { apiInstance } from './api'

export const getInstitution = (id: number) =>
  apiInstance.get<TApiInstitutionResponse[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}institution/${id}`,
  )

export const getInstitutions = (query: {
  limit?: number
  searchName?: string
  institutionId?: number
  brandId?: number
  includeIds?: number[] | null
  status?: string
}) => {
  return apiRequest<{
    count: number
    results: TApiInstitutionResponse[]
  }>({
    path: 'institution',
    method: 'GET',
    throwError: true,
    queryParams: {
      ...query,
      institution_id: query.institutionId,
      include_ids: query.includeIds,
      search_name: query.searchName,
      brand_id: query.brandId,
    },
    useApiFilters: false,
  })
}
