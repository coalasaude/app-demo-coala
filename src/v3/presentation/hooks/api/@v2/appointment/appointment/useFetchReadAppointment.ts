import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  readAppointment,
  ReadAppointmentParams,
} from '@/v3/infra/services/@v2/appointment/appointment/read-appointment'

import { useFetch } from '../../@shared/useFetch'

type QueryReadAppointmentParams = ReadAppointmentParams & {
  refetchInterval?: number
}

export const useFetchReadAppointment = (params: QueryReadAppointmentParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => readAppointment(params),
    queryKey: [QueryKeyEnum.APPOINTMENT, params.appointmentId],
    refetchInterval: params.refetchInterval,
  })

  return {
    ...response,
    appointment: data?.appointment,
    meeting: data?.meeting,
  }
}
