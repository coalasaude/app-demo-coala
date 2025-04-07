import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  browseUserVaccine,
  BrowseUserVAccineParams,
} from '@/v3/infra/services/@v2/health-history/vaccine/browse-user-vaccine'

import { useFetch } from '../../@shared/useFetch'

export const useFetchBrowseUserVaccine = (params: BrowseUserVAccineParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseUserVaccine(params),
    queryKey: [QueryKeyEnum.USER_VACCINE, params.userId],
  })

  return {
    ...response,
    vaccines: data,
  }
}
