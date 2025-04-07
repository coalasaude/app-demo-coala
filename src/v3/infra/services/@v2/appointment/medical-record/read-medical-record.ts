import {
  MedicalRecordModel,
  MedicalRecordModelConstructor,
} from '@/v3/domain/@v2/appointment/medical-record.model'

import apiRequest from '../../../api'

export type ReadMedicalRecordResponse = MedicalRecordModelConstructor

export interface ReadMedicalRecordParams {
  medicalRecordId: number
  appointmentId: number
}

export async function readMedicalRecord({
  appointmentId,
  medicalRecordId,
}: ReadMedicalRecordParams) {
  const data = (await apiRequest<ReadMedicalRecordResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/appointments/:appointmentId/medical-records/:medicalRecordId',
    pathParams: { appointmentId, medicalRecordId },
  })) as ReadMedicalRecordResponse

  return new MedicalRecordModel(data)
}
