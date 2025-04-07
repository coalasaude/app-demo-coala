import React from 'react'

import { IndicationApiFilter, getRedeem } from '@/v3/infra/services/indication'
import { Indication } from '@/v3/domain/Indication'
import { TApiIndicationResponse } from '@/v3/domain/api/ApiIndicationResponse'

import { useFetch } from './useFetch'

export const useFetchIndicationRedeem = () => {
  const [filter, setFilter] = React.useState<IndicationApiFilter>({})
  const { data: redeemData, ...rest } = useFetch({
    queryKey: ['indications-redeem', filter],
    queryFn: () => getRedeem(filter),
  })

  const data: Indication[] = React.useMemo(
    () =>
      redeemData?.data?.results.map(
        (indication: TApiIndicationResponse) => new Indication(indication)
      ) || [],
    [redeemData]
  )

  return {
    data,
    filter,
    setFilter,
    ...rest,
  }
}
