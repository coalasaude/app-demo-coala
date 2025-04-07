import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { lastAppointments } from '@/v3/infra/services/@v2/dashboard/last-appointments'

import { useFetch } from '../@shared/useFetch'

export type LastAppointmentsParams = {
  institutionId: number
}

export const useFetchLastAppointments = (params: LastAppointmentsParams) => {
  const { data, ...rest } = useFetch({
    queryFn: () => lastAppointments(params),
    queryKey: [QueryKeyEnum.DASHBOARD_LAST_APPOINTMENTS, params],
  })

  return {
    data,
    ...rest,
  }
}
