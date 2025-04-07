import { useMemo } from 'react'

import { getHealthUnit } from '@/v3/infra/services/healthUnit'
import { HealthUnit } from '@/v3/domain/HealthUnit'

import { QueryKeyEnum } from '../enums/query-keys.enum'

import { useFetch } from './useFetch'

interface UseFetchHealthUnitProps {
  healthUnitId: number
}

/**
 * @deprecated Use useFetchReadHealthUnit instead
 */
export const useFetchHealthUnit = ({ healthUnitId }: UseFetchHealthUnitProps) => {
  const { data: healthUnitData, ...rest } = useFetch({
    queryFn: () => getHealthUnit(healthUnitId),
    queryKey: [QueryKeyEnum.HEALTH_UNIT, healthUnitId],
  })

  const data = useMemo(
    () => (healthUnitData ? new HealthUnit(healthUnitData) : undefined),
    [healthUnitData],
  )

  return {
    ...rest,
    healthUnitData,
    data,
  }
}
