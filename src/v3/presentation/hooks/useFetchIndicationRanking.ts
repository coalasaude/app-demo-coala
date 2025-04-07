import React from 'react'

import { getRanking } from '@/v3/infra/services/indication'
import { User } from '@/v3/domain/User'

import { useFetch } from './useFetch'

export const useFetchIndicationRaking = () => {
  const { data: rankingData, ...rest } = useFetch({
    queryKey: ['indications-ranking'],
    queryFn: getRanking,
  })

  const data: {
    count: number
    user: User
  }[] = React.useMemo(
    () =>
      rankingData?.data?.map((item: any) => ({
        count: item?.count,
        user: new User(item?.user),
      })),
    [rankingData]
  )

  return {
    data,
    ...rest,
  }
}
