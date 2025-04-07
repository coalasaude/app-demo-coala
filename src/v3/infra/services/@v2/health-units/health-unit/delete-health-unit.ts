import apiRequest from '../../../api'

export type DeleteHealthUnitParams = {
  healthUnitId: number
}

export async function deleteHealthUnit(params: DeleteHealthUnitParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/health-units/:healthUnitId',
    pathParams: { healthUnitId: params.healthUnitId },
  })
}
