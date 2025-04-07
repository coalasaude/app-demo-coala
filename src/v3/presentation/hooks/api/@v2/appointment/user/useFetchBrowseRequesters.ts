import {
  browseAppointmentRequesters,
  BrowseAppointmentRequestersParams,
} from '@/v3/infra/services/@v2/appointment/user/browse-requesters'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useFetch } from '../../@shared/useFetch'

export const useFetchBrowseAppointmentRequesters = (params: BrowseAppointmentRequestersParams) => {
  const { data, ...response } = useFetch({
    queryFn: async () => {
      if (!params.institutionId) return null
      return browseAppointmentRequesters(params)
    },
    queryKey: [QueryKeyEnum.APPOINTMENT_REQUESTER, params],
  })

  return {
    ...response,
    requesters: data,
  }
}
