import React from 'react'

import { getUserById } from '@/v3/infra/services/user/user'
import { User } from '@/v3/domain/User'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useFetch } from '../../useFetch'

/**
 * @deprecated - Use useFetchReadUser from v2
 */
export const useFetchUserById = (id?: number) => {
  const { data, isLoading, ...rest } = useFetch({
    queryKey: [QueryKeyEnum.USER, id],
    queryFn: () => {
      if (id) return getUserById(id)
      return Promise.resolve(null)
    },
  })

  const user = React.useMemo(() => {
    if (data) {
      return new User(data)
    } else {
      return undefined
    }
  }, [data])

  return {
    ...rest,
    data: user,
    isLoadingUser: isLoading,
  }
}
