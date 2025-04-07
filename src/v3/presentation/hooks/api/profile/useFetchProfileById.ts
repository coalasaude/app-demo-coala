import { TApiProfile, getProfileById } from '@/v3/infra/services/profiles/profiles'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { Profile } from '@/v3/domain/Profile'

import { useFetch } from '../../useFetch'

/**
 * @deprecated Use useFetchReadProfile from v2 instead
 */
export const useFetchProfileById = (id?: number) => {
  const response = useFetch<TApiProfile>({
    queryFn: () => {
      if (!id) return Promise.resolve(null)
      return getProfileById(id)
    },
    queryKey: [QueryKeyEnum.PROFILES, id],
  })

  const data = response.data ? new Profile(response.data) : undefined

  return {
    ...response,
    data,
  }
}
