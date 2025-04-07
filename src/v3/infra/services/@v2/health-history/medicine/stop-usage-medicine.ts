import apiRequest from '../../../api'

export interface EditMedicineUsageParams {
  id: number
  userId: number
  usageStopped: boolean
}

export async function stopUsageMedicine({ userId, id, ...params }: EditMedicineUsageParams) {
  await apiRequest({
    method: 'PATCH',
    throwError: true,
    path: 'v2/users/:userId/health-history/medicine/:id/stop',
    body: { userId, id, ...params },
    pathParams: { userId, id },
  })
}
