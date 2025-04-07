import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { browseProfiles } from '@/v3/infra/services/@v2/users/profiles/browse-profiles'

import { useFetch } from '../../@shared/useFetch'

export const useFetchBrowseProfiles = () => {
  const { data, ...response } = useFetch({
    queryFn: () => browseProfiles(),
    queryKey: [QueryKeyEnum.PROFILES],
  })

  return {
    ...response,
    profiles: data,
  }
}
