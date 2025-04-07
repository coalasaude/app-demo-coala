import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  readPrescription,
  ReadPrescriptionParams,
} from '@/v3/infra/services/@v2/appointment/prescription/read-prescription'

import { useFetch } from '../../@shared/useFetch'

export const useFetchReadPrescription = (params: ReadPrescriptionParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => readPrescription(params),
    queryKey: [QueryKeyEnum.APPOINTMENT_PRESCRIPTION, params.appointmentId, params.prescriptionId],
  })

  return {
    ...response,
    prescription: data,
  }
}
