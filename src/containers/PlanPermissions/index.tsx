import { useCallback, useEffect } from 'react'

import useMediaQuery from '@/hooks/useMediaQuery'
import { useLazyFetch } from '@/hooks/useFetch'
import { IListResponse } from '@/types/request'
import { ListSkeleton } from '@/components/Skeletons'
import { Plan } from '@/types/plan'
import { IntervalTimes } from '@/constants/interval'

import PlanPermissionListMobile from './index.mobile'
import PlanPermissionListDesktop from './index.desktop'

export const PlanPermissionList = () => {
  const [apiRequest, { data }] = useLazyFetch<IListResponse<Plan>>()
  const isSmallDevice = useMediaQuery('sm')
  const getPlans = useCallback(async () => {
    await apiRequest({
      path: 'plan',
      method: 'GET',
      queryParams: {
        limit: 100,
        offset: 0,
      },
    })
  }, [apiRequest])

  useEffect(() => {
    getPlans()
  }, [getPlans])

  if (data === undefined) {
    return <ListSkeleton />
  }

  if (isSmallDevice) {
    return <PlanPermissionListMobile IntervalTimes={IntervalTimes} data={data} />
  }

  return <PlanPermissionListDesktop data={data} IntervalTimes={IntervalTimes} />
}

export default PlanPermissionList
