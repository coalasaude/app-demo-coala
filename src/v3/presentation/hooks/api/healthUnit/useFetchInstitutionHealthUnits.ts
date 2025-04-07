import { useMemo } from 'react'

import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { HealthUnit } from '@/v3/domain/HealthUnit'
import { getInstitutionHealthUnits } from '@/v3/infra/services/healthUnit'

import { useFetch } from '../../useFetch'

export const useFetchInstitutionHealthUnits = (institutionId: number) => {
  const { data: institutionHealthUnitsData, ...rest } = useFetch({
    queryFn: () => getInstitutionHealthUnits(institutionId),
    queryKey: [QueryKeyEnum.HEALTH_UNIT, institutionId],
  })

  const data = useMemo(
    () => (institutionHealthUnitsData ? new HealthUnit(institutionHealthUnitsData) : undefined),
    [institutionHealthUnitsData]
  )

  return {
    ...rest,
    institutionHealthUnitsData,
    data,
  }
}
