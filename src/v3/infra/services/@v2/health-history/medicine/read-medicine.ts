import {
  MedicineModel,
  MedicineModelConstructor,
} from '@/v3/domain/@v2/health-history/medicine/medicine.model'

import apiRequest from '../../../api'

export type ReadMedicineResponse = MedicineModelConstructor

export interface ReadMedicineParams {
  medicineId: number
  userId: number
}

export async function readMedicine({ userId, medicineId }: ReadMedicineParams) {
  const data = (await apiRequest<ReadMedicineResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/health-history/medicine/:medicineId',
    pathParams: { userId, medicineId },
  })) as ReadMedicineResponse

  return new MedicineModel(data)
}
