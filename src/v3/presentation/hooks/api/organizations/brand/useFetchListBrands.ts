import { listBrands } from '@/v3/infra/services/organizations/brand'
import { TApiListBrands } from '@/v3/domain/api/organizations/ApiOrganizationResponse'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useFetch } from '../../../useFetch'

export interface BrandFilters {
  limit?: number
  offset?: number
  searchName?: string
  networkId?: number
}

export const useFetchListBrands = ({
  limit = 0,
  offset = 0,
  searchName,
  networkId,
}: BrandFilters) => {
  const { data, ...rest } = useFetch<TApiListBrands>({
    queryFn: () => listBrands({ limit, offset, searchName, networkId }),
    queryKey: [QueryKeyEnum.COST_CENTER, limit, offset, searchName],
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  return {
    data,
    ...rest,
  }
}
