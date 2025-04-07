import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { getProfiles } from '@/v3/infra/services/user/user'
import { TApiProfilesReponse } from '@/v3/domain/api/TApiProfilesReponse'
import { Profile } from '@/v3/domain/Profile'

import { useFetch } from './useFetch'

type Filters = {
  institutionTypeId?: number
  institutionId?: number | null
}

export const useFetchUserProfiles = (filters?: Filters) => {
  const { data, ...rest } = useFetch<TApiProfilesReponse[]>({
    queryFn: () =>
      getProfiles({
        institutionTypeId: filters?.institutionTypeId,
        institutionId: filters?.institutionId || undefined,
      }),
    queryKey: [QueryKeyEnum.PROFILES, filters],
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  return {
    data: data?.map((profile) => new Profile(profile)),
    ...rest,
  }
}
