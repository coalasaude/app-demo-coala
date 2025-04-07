import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  BrowseInstitutionsParams,
  browseInstitutions,
} from '@/v3/infra/services/@v2/health-units/institution/browse-institutions'

import { useFetch } from '../../@shared/useFetch'

export const useFetchBrowseInstitutions = (params: BrowseInstitutionsParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseInstitutions(params),
    queryKey: [QueryKeyEnum.HEALTH_UNIT_INSTITUTIONS, ...Object.values(params)],
  })

  return {
    ...response,
    response: data,
  }
}
