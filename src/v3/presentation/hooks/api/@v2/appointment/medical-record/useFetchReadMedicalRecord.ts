import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  readMedicalRecord,
  ReadMedicalRecordParams,
} from '@/v3/infra/services/@v2/appointment/medical-record/read-medical-record'

import { useFetch } from '../../@shared/useFetch'

export const useFetchReadMedicalRecord = (params: ReadMedicalRecordParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => readMedicalRecord(params),
    queryKey: [
      QueryKeyEnum.APPOINTMENT_MEDICAL_RECORD,
      params.appointmentId,
      params.medicalRecordId,
    ],
  })

  return {
    ...response,
    medicalrecord: data,
  }
}
