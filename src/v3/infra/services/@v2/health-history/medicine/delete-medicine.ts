import apiRequest from '../../../api'

export interface DeleteMedicineParams {
  medicineId: number
  userId: number
}

export async function deleteMedicine({ userId, medicineId }: DeleteMedicineParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/users/:userId/health-history/medicine/:medicineId',
    pathParams: { userId, medicineId },
  })
}
