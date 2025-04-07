import {
  browseAppointmentPatients,
  BrowseAppointmentPatientsParams,
} from '@/v3/infra/services/@v2/appointment/user/browse-patients'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useFetch } from '../../@shared/useFetch'

export const useFetchBrowseAppointmentPatients = (params: BrowseAppointmentPatientsParams) => {
  const { data, ...response } = useFetch({
    queryFn: async () => {
      if (!params.institutionId) return null
      return browseAppointmentPatients(params)
    },
    queryKey: [QueryKeyEnum.APPOINTMENT_PATIENT, params],
  })

  return {
    ...response,
    patients: data,
  }
}
