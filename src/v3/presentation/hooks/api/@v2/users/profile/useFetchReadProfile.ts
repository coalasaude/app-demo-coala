import { ReadProfileParams, readProfile } from '@/v3/infra/services/@v2/users/profiles/read-profile'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useFetch } from '../../@shared/useFetch'

export const useFetchReadProfile = (params: ReadProfileParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => {
      if (!params.profileId) return Promise.resolve(null)
      return readProfile(params)
    },
    queryKey: [QueryKeyEnum.PROFILES, params.profileId, 'v2'],
  })

  return {
    ...response,
    profile: data,
  }
}
