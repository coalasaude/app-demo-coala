import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  browseAppointments,
  BrowseAppointmentsParams,
} from '@/v3/infra/services/@v2/appointment/appointment/browse-appointments'

import { useFetch } from '../../@shared/useFetch'

export const useFetchBrowseAppointments = (params: BrowseAppointmentsParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseAppointments(params),
    queryKey: [QueryKeyEnum.APPOINTMENT, params],
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })

  return {
    ...response,
    appointments: data,
  }
}
