import { PrescriptionType } from '@/types/records'

import apiRequest from '../../../api'

export interface AddMedicineParams {
  name: string
  concentration: number
  medicineConcentrationUnitId: number
  medicineDosageUnitId: number
  scheduledMedicineId: number
  dosage: number
  treatmentDays?: number
  recommendation?: string
  observation?: string
}

export interface AddPrescriptionParams {
  appointmentId: number
  certificationPassword: string
  validUntil: Date
  type: PrescriptionType
  medicines: AddMedicineParams[]
}

export async function addPrescription({ appointmentId, ...params }: AddPrescriptionParams) {
  const prescription = (await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/appointments/:appointmentId/prescriptions',
    body: params,
    pathParams: { appointmentId },
  })) as { id: number }

  return prescription
}
