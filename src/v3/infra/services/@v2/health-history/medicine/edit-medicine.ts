import { AuthorizationStatus } from '@/types/medicine'
import { MedicineUsageStatus } from '@/v3/domain/medicine'

import apiRequest from '../../../api'

export interface EditMedicineParams {
  medicineId: number
  userId: number

  isContinuousUsage?: boolean
  authorizationStatus?: AuthorizationStatus
  usageStatus?: MedicineUsageStatus

  name?: string
  concentration?: number
  medicineConcentrationUnitId?: number
  medicineDosageUnitId?: number
  scheduledMedicineId?: number
  dosage?: number
  startHour?: number
  startDate?: Date
  treatmentDays?: number
  recommendation?: string
  observation?: string
  documentId?: number
  prescription?: {
    documentId: number
  }
}

export async function editMedicine({ userId, medicineId, ...params }: EditMedicineParams) {
  await apiRequest({
    method: 'PATCH',
    throwError: true,
    path: 'v2/users/:userId/health-history/medicine/:medicineId',
    body: params,
    pathParams: { userId, medicineId },
  })
}
