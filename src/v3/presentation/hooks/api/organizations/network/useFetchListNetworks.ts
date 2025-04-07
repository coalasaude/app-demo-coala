import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { TApiListNetworks } from '@/v3/domain/api/organizations/ApiOrganizationResponse'
import { listNetworks } from '@/v3/infra/services/organizations/network'

import { useFetch } from '../../../useFetch'

interface Filters {
  limit?: number
  offset?: number
  searchName?: string
}

export const useFetchListNetworks = ({ limit = 0, offset = 0, searchName }: Filters) => {
  const { data, ...rest } = useFetch<TApiListNetworks>({
    queryFn: () => listNetworks({ limit, offset, searchName }),
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
