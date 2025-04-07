import { useState } from 'react'

import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { listInstitutions } from '@/v3/infra/services/organizations/institution'
import { listBrands } from '@/v3/infra/services/organizations/brand'
import { listNetworks } from '@/v3/infra/services/organizations/network'
import {
  CostCenter,
  InstitutionViolationType,
  InstitutionStatus,
} from '@/v3/domain/organizations/Organization'

import { useFetch } from '../../useFetch'

export interface ListOrganizationsFilters {
  limit?: number
  offset?: number
  searchName?: string
  onlyCostCenter?: boolean
  status?: InstitutionStatus
  type?: CostCenter
  costCenter?: boolean
  violation?: InstitutionViolationType
}

export const useFetchListOrganizations = ({ limit = 12, ...filters }: ListOrganizationsFilters) => {
  const [offset, setOffset] = useState<number>(filters.offset || 0)

  const orgDictionary: Record<CostCenter, (param: any) => Promise<any>> = {
    [CostCenter.BRAND]: listBrands,
    [CostCenter.INSTITUTION]: listInstitutions,
    [CostCenter.NETWORK]: listNetworks,
  }
  const { data, ...rest } = useFetch({
    queryFn: () =>
      orgDictionary[filters?.type || CostCenter.INSTITUTION]({
        ...filters,
        limit,
        offset,
      }),
    queryKey: [
      QueryKeyEnum.COST_CENTER,
      limit,
      offset,
      filters.searchName,
      filters.onlyCostCenter,
      filters.type,
      filters.status,
      filters.violation,
    ],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  return {
    data,
    offset,
    setOffset,
    ...rest,
  }
}
