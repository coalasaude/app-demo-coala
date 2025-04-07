import { useMemo } from 'react'

import { getFollowUp } from '@/v3/infra/services/appointment'
import { FollowUp } from '@/v3/domain/follow-up'

import { useFetch } from './useFetch'

interface IUseFetchFollowUpProps {
  appointmentId: number
  followUpId: number
}

export const useFetchFollowUp = ({ appointmentId, followUpId }: IUseFetchFollowUpProps) => {
  const { data: followUpData, ...rest } = useFetch({
    queryFn: () => getFollowUp(appointmentId, followUpId),
    queryKey: ['follow-up'],
  })

  const data = useMemo(() => (followUpData ? new FollowUp(followUpData) : null), [followUpData])

  return {
    ...rest,
    followUpData,
    data,
  }
}
