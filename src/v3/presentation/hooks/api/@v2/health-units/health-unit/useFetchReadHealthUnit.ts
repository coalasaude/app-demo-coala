import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  ReadHealthUnitParams,
  readHealthUnit,
} from '@/v3/infra/services/@v2/health-units/health-unit/read-health-unit'

import { useFetch } from '../../@shared/useFetch'

export const useFetchReadHealthUnit = (params: ReadHealthUnitParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => readHealthUnit(params),
    queryKey: [QueryKeyEnum.HEALTH_UNIT, params.healthUnitId],
  })

  return {
    ...response,
    healthUnit: data,
  }
}
