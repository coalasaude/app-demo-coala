import { useCallback, useMemo } from 'react'

import { useLazyFetch } from '@/v3/presentation/hooks/useFetch'
import { TApiUserResponse } from '@/v3/domain/api/ApiUserResponse'
import { User } from '@/v3/domain/User'

export const useFetchUser = () => {
  const [fetchUserList, { data: userList, ...restUserList }] = useLazyFetch<{
    count: number
    results: TApiUserResponse[]
  }>()
  const [fetchUser, { data: userData, ...restUser }] = useLazyFetch<TApiUserResponse>()

  const apiRequest = useCallback(
    async (filters?: { search_name?: string; institution_id?: string; profile_id?: string }) =>
      await fetchUserList({
        path: 'user',
        queryParams: {
          ...filters,
        },
        method: 'GET',
      }),
    [fetchUserList]
  )

  const getUserById = useCallback(
    async (id?: number) =>
      await fetchUser({
        path: `user/${id}`,
        method: 'GET',
      }),
    [fetchUser]
  )

  const users = useMemo(
    () => userList?.results?.map((user) => user && new User(user)) || [],
    [userList]
  )

  const user = useMemo(() => userData && new User(userData), [userData])

  return {
    apiRequest,
    getUserById,
    users,
    user,
    ...restUser,
    ...restUserList,
  }
}
