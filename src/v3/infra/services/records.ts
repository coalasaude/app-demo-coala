import { TApiMedicalRecordResponse } from '@/v3/domain/medical-record'
import { RecordsType } from '@/types/records'

import apiRequest from './api'

export const getRecords = (appointmentId: number, filter_type?: string) =>
  apiRequest<TApiMedicalRecordResponse>({
    method: 'GET',
    path: `appointments/${appointmentId}/records`,
    queryParams: {
      filter_type: filter_type ? filter_type : '',
    },
  })

type InvalidateRecordParams = {
  appointmentId: number
  recordId: number
  recordType: RecordsType
}

export function invalidateRecord({ appointmentId, recordId, recordType }: InvalidateRecordParams) {
  const pathsMap = {
    [RecordsType.MEDICAL_RECORDS]: 'medical-records',
    [RecordsType.EXAM]: 'exams',
    [RecordsType.PRESCRIPTION]: 'prescriptions',
    [RecordsType.SICKNOTE]: 'sick-notes',
    [RecordsType.REPORTS]: 'reports',
    [RecordsType.ATTACHMENTS]: 'attachments',
    [RecordsType.APPOINTMENT_DIAGNOSE]: 'diagnose',
  } as any

  return apiRequest({
    path: `appointments/:appointmentId/${pathsMap[recordType]}/:recordId`,
    method: 'DELETE',
    pathParams: { recordId, appointmentId },
    throwError: true,
  })
}
