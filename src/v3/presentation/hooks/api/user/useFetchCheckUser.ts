import React, { useMemo, useState } from 'react'
import { debounce } from 'lodash'

import { checkUser } from '@/v3/infra/services/user/user'
import { User } from '@/v3/domain/User'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useFetch } from '../../useFetch'

export const useFetchCheckUser = () => {
  const [access, setAccess] = useState('')
  const { data, isLoading, ...rest } = useFetch({
    queryKey: [QueryKeyEnum.USER, access],
    queryFn: () => {
      if (access) return checkUser({ access })
      return Promise.resolve(null)
    },
  })

  const debouncedSetAccess = useMemo(
    () =>
      debounce((value) => {
        setAccess(value)
      }, 500),
    [setAccess]
  )

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
    setAccess: debouncedSetAccess,
    isLoadingUser: isLoading,
  }
}
