import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  browseDisease,
  BrowseDiseaseParams,
} from '@/v3/infra/services/@v2/health-history/diseases/browse-disease'

import { useFetch } from '../../@shared/useFetch'

export const useFetchBrowseDisease = (params: BrowseDiseaseParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseDisease(params),
    queryKey: [QueryKeyEnum.DISEASE, params.userId],
  })

  return {
    ...response,
    diseases: data,
  }
}
