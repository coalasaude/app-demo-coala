import { useMemo } from 'react'

import { listHealthUnits } from '@/v3/infra/services/healthUnit'
import { HealthUnit } from '@/v3/domain/HealthUnit'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { DefaultStatus } from '@/types/status'

import { useFetch } from '../../useFetch'

export interface ListHealthUnits {
  name?: string
  email?: string
  phone?: string
  status?: DefaultStatus
}

export const useFetchListHealthUnit = (filters?: ListHealthUnits) => {
  const { data: healthUnitListData, ...rest } = useFetch({
    queryFn: () => listHealthUnits(filters),
    queryKey: [QueryKeyEnum.HEALTH_UNIT, { ...filters }],
  })

  const data = useMemo(
    () => (healthUnitListData ? new HealthUnit(healthUnitListData) : undefined),
    [healthUnitListData]
  )

  return {
    ...rest,
    healthUnitListData,
    data,
  }
}
