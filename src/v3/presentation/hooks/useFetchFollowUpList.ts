import { useMemo } from 'react'

import { listFollowUp } from '@/v3/infra/services/appointment'
import { FollowUp } from '@/v3/domain/follow-up'
import { TApiFollowUpResponse } from '@/v3/domain/api/ApiFollowUpResponse'
import { IListResponse } from '@/types/request'

import { useFetch } from './useFetch'

export const useFetchFollowUpList = () => {
  const { data: followUpData, ...rest } = useFetch({
    queryFn: listFollowUp,
    queryKey: ['follow-up'],
  })

  const dataFollowUp: IListResponse<TApiFollowUpResponse> = followUpData?.data

  const data = useMemo(
    () =>
      !!dataFollowUp?.count
        ? dataFollowUp?.results?.map((followUp) => new FollowUp(followUp)) || []
        : [],
    [dataFollowUp]
  )

  return {
    ...rest,
    data,
  }
}
