import { useCallback, useMemo } from 'react'

import { useLazyFetch } from '@/v3/presentation/hooks/useFetch'
import { Profile } from '@/v3/domain/Profile'
import { ProfileType } from '@/types/profile'

export const useFetchProfile = () => {
  const [fetch, { data, ...rest }] = useLazyFetch<{
    count: number
    results: {
      id: number
      name: string
      institutionTypeId?: number
      type: ProfileType
      registrationDescription?: string
    }[]
  }>()

  const apiRequest = useCallback(
    async () =>
      await fetch({
        path: 'profiles',
        method: 'GET',
      }),
    [fetch]
  )

  const profiles = useMemo(
    () => data?.results?.map((profile) => new Profile(profile)) || [],
    [data]
  )
  return {
    apiRequest,
    data: profiles,
    ...rest,
  }
}
