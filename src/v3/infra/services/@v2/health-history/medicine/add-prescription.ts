import { AuthorizationStatus } from '@/v3/domain/medicine'

import apiRequest from '../../../api'

export type AddMedicineParams = {
  name: string
  concentration: number
  medicineConcentrationUnitId: number
  medicineDosageUnitId: number
  scheduledMedicineId: number
  dosage: number
  startHour?: number
  startDate?: Date
  treatmentDays?: number
  recommendation?: string
  observation?: string
  documentId?: number
  authorizationStatus?: AuthorizationStatus
}

export interface AddPrescriptionParams {
  medicines: AddMedicineParams[]
  documentId: number
  emissionDate: Date
}

export interface AddPrescriptionsParams {
  userId: number
  prescriptions: AddPrescriptionParams[]
}

export async function addPrescription({ userId, prescriptions }: AddPrescriptionsParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/health-history/prescriptions',
    body: { prescriptions },
    pathParams: { userId },
  })
}
