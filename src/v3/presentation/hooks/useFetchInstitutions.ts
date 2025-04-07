import { useCallback, useMemo } from 'react'

import { useLazyFetch } from '@/v3/presentation/hooks/useFetch'
import { Institution } from '@/v3/domain/organizations/Organization'
import { TApiInstitution } from '@/v3/domain/api/organizations/ApiOrganizationResponse'

export const useFetchInstitutions = () => {
  const [fetch, { data, ...rest }] = useLazyFetch<{
    count: number
    results: TApiInstitution[]
  }>()

  const apiRequest = useCallback(
    async (filters?: { search_name?: string }) =>
      await fetch({
        path: 'cost-center/institution',
        queryParams: {
          limit: 100,
          ...filters,
        },
        method: 'GET',
      }),
    [fetch]
  )

  const institutions = useMemo(
    () => data?.results?.map((institution) => new Institution(institution)) || [],
    [data]
  )

  return {
    apiRequest,
    data: institutions,
    ...rest,
  }
}
