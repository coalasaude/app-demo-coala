import { useMemo } from 'react'

import { Institution } from '@/v3/domain/Institution'
import { TApiInstitutionResponse } from '@/v3/domain/api/ApiInstitutionResponse'
import { getInstitutions } from '@/v3/infra/services/institution'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useFetch } from '../../useFetch'

export const useFetchInstitutions = (query: {
  limit?: number
  searchName?: string
  institutionId?: number
  brandId?: number
  includeIds?: number[] | null
  status?: string
}) => {
  const { data, isLoading, ...rest } = useFetch<{
    count: number
    results: TApiInstitutionResponse[]
  }>({
    queryKey: [QueryKeyEnum.INSTITUTION, query],
    queryFn: () => {
      return getInstitutions(query)
    },
    refetchOnWindowFocus: false,
    refetchInterval: Infinity,
  })

  const institutions = useMemo(
    () => data?.results?.map((institution) => new Institution(institution)) || [],
    [data],
  )

  return {
    ...rest,
    institutions,
    count: data?.count || 0,
    isLoading,
  }
}
