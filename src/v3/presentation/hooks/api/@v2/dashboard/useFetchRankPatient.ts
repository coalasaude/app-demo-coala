import { useMemo } from 'react'

import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { DashboardQueryParams } from '@/v3/infra/services/@v2/dashboard/dashboard.types'
import { RankPatientAppointmentOutput } from '@/v3/domain/organizations/Dashboard'
import { getRankPatient } from '@/v3/infra/services/@v2/dashboard/dashboard'
import { PersonType } from '@/v3/presentation/pages/organizations/pages/view/components/InstitutionCharts/Ranking/components'

import { useFetch } from '../@shared/useFetch'

export const useFetchRankPatient = (params: DashboardQueryParams) => {
  const { data: response, ...rest } = useFetch<RankPatientAppointmentOutput[]>({
    queryFn: () => getRankPatient(params),
    queryKey: [QueryKeyEnum.DASHBOARD_RANK_PATIENT, params],
  })

  const patients = useMemo(() => {
    if (!response?.length) return []

    return response?.map((p) => {
      return {
        id: p?.id || 0,
        name: p?.patient || 'Não informado',
        profile: p?.profile || 'Não informado',
        image: p?.image,
        number: p?.count || 0,
      }
    }) as PersonType
  }, [response])

  return {
    data: response,
    patients,
    ...rest,
  }
}
