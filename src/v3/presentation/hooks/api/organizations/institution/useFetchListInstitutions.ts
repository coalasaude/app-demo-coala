import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { TApiListInstitutions } from '@/v3/domain/api/organizations/ApiOrganizationResponse'
import { listInstitutions } from '@/v3/infra/services/organizations/institution'
import { Institution } from '@/v3/domain/organizations/Organization'

import { useFetch } from '../../../useFetch'

export interface ListInstitutionsFilters {
  limit: number
  offset: number
  searchName?: string
  brandIds?: number[]
  networkId?: number
}

export interface Options {
  canListAll?: boolean
}

export const useFetchListInstitutions = (filters: ListInstitutionsFilters, options?: Options) => {
  const { limit, offset, searchName, brandIds, networkId } = filters

  const { data, ...rest } = useFetch<TApiListInstitutions>({
    queryFn: () => {
      if (!brandIds?.length && !networkId && !options?.canListAll)
        return Promise.resolve({ data: [] })
      return listInstitutions({ limit, offset, searchName, brandIds, networkId })
    },
    queryKey: [QueryKeyEnum.COST_CENTER, limit, offset, searchName, brandIds, networkId],
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  const institutionData = data?.results?.map((institution) => new Institution(institution))

  return {
    data: { count: data?.count, results: institutionData },
    ...rest,
  }
}
