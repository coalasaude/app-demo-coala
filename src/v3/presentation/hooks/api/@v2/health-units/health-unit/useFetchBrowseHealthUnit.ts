import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  BrowseHealthUnitParams,
  browseHealthUnit,
} from '@/v3/infra/services/@v2/health-units/health-unit/browse-health-unit'

import { useFetch } from '../../@shared/useFetch'

export const useFetchBrowseHealthUnit = (params: BrowseHealthUnitParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseHealthUnit(params),
    queryKey: [QueryKeyEnum.HEALTH_UNIT, ...Object.values(params)],
  })

  return {
    ...response,
    response: data,
  }
}
