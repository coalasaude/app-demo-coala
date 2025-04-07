import { lastDependentsAppointments } from '@/v3/infra/services/@v2/dashboard/last-dependents-appointments'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useFetch } from '../@shared/useFetch'

export const useFetchLastDependentsAppointments = () => {
  const { data, ...rest } = useFetch({
    queryFn: () => lastDependentsAppointments(),
    queryKey: [QueryKeyEnum.DASHBOARD_LAST_DEPENDENTS_APPOINTMENTS],
  })

  return {
    data,
    ...rest,
  }
}
