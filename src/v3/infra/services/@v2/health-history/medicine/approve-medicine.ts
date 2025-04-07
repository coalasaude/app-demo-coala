import apiRequest from '../../../api'

export interface ApproveMedicineParams {
  id: number
  userId: number

  isUsingMedicine: boolean
  startHour?: number | null
  startDate?: Date | null
}

export async function approveMedicine({ userId, id, ...params }: ApproveMedicineParams) {
  await apiRequest({
    method: 'PATCH',
    throwError: true,
    path: 'v2/users/:userId/health-history/medicine/:id/approve',
    body: params,
    pathParams: { userId, id },
  })
}
