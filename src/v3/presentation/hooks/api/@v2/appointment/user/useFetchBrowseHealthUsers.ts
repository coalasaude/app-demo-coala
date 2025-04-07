import {
  BrowseAppointmentHealthUsersParams,
  browseAppointmentHealthUsers,
} from '@/v3/infra/services/@v2/appointment/user/browse-health-users'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useFetch } from '../../@shared/useFetch'

export const useFetchBrowseAppointmentHealthUsers = (
  params: BrowseAppointmentHealthUsersParams,
) => {
  const { data, ...response } = useFetch({
    queryFn: async () => {
      return browseAppointmentHealthUsers(params)
    },
    queryKey: [QueryKeyEnum.APPOINTMENT_HEALTH_USERS, params],
  })

  return {
    ...response,
    requesters: data,
  }
}
