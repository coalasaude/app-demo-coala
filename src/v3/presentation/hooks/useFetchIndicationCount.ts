import React from 'react'

import { TApiIndicationCountResponse, getIndicationCount } from '@/v3/infra/services/indication'

import { useFetch } from './useFetch'

export const useFetchIndicationCount = () => {
  const { data: indicationCountData, ...rest } = useFetch({
    queryKey: ['indications-count'],
    queryFn: getIndicationCount,
  })

  const data: TApiIndicationCountResponse = React.useMemo(() => {
    return indicationCountData?.data
  }, [indicationCountData])

  return {
    data,
    ...rest,
  }
}
