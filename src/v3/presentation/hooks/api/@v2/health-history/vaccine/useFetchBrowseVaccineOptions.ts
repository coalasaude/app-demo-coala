import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  browseVaccineOptions,
  BrowseVaccineOptionsParams,
} from '@/v3/infra/services/@v2/health-history/vaccine/browse-vaccine-options'

import { useFetch } from '../../@shared/useFetch'

export const useFetchBrowseVaccineOptions = (params: BrowseVaccineOptionsParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseVaccineOptions(params),
    queryKey: [QueryKeyEnum.VACCINE, params.userId],
  })

  return {
    ...response,
    vaccines: data,
  }
}
