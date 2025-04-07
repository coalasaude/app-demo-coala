import { useMemo } from 'react'

import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { DashboardQueryParams } from '@/v3/infra/services/@v2/dashboard/dashboard.types'
import { RankComplaintAppointmentOutput } from '@/v3/domain/organizations/Dashboard'
import { getRankComplaint } from '@/v3/infra/services/@v2/dashboard/dashboard'

import { useFetch } from '../@shared/useFetch'

export const useFetchRankComplaints = (params: DashboardQueryParams) => {
  const { data: response, ...rest } = useFetch<RankComplaintAppointmentOutput[]>({
    queryFn: () => getRankComplaint(params),
    queryKey: [QueryKeyEnum.DASHBOARD_RANK_COMPLAINTS, params],
  })

  const data = useMemo(() => {
    if (!response?.length) return []

    return response
      ?.map((a) => {
        return {
          label: a?.complaint,
          value: a?.count || 0,
        }
      })
      .filter((_, index) => index < 9)
  }, [response])

  return {
    data,
    ...rest,
  }
}
