import { HealthUnitModelConstructor } from '@/v3/domain/@v2/health-units/health-unit/health-unit.model'

import apiRequest from '../../../api'

export type AddHealthUnitParams = {
  healthUnitId: number
  payload: HealthUnitModelConstructor
}

export async function editHealthUnit(params: AddHealthUnitParams) {
  await apiRequest({
    method: 'PUT',
    throwError: true,
    path: 'v2/health-units/:healthUnitId',
    pathParams: { healthUnitId: params.healthUnitId },
    body: params.payload,
  })
}
