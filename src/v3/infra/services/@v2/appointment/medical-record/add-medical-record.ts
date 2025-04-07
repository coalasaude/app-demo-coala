import { MedicalRecordClassification } from '@/types/medicalRecord'

import apiRequest from '../../../api'
import { addDiagnose, AddDiagnoseParams } from '../diagnose/add-diagnose'

export interface AddMedicalRecordParams {
  appointmentId: number
  classification: MedicalRecordClassification
  history: string
  exam: string
  impression: string
  conduct: string
  certificationPassword: string
  systolic?: number
  diastolic?: number
  respiratoryFrequency?: number
  bodyTemperature?: number
  heartRate?: number
  oxygenSaturation?: number

  diagnose?: Omit<AddDiagnoseParams, 'appointmentId'>
}

export async function addMedicalRecord({ appointmentId, ...params }: AddMedicalRecordParams) {
  const medicalRecord = (await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/appointments/:appointmentId/medical-records',
    body: params,
    pathParams: { appointmentId },
  })) as { id: number }

  if (params.diagnose) {
    await addDiagnose({ appointmentId, ...params.diagnose })
  }

  return medicalRecord
}
