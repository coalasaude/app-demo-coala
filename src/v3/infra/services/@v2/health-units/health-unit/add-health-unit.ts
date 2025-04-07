import { HealthUnitModelConstructor } from '@/v3/domain/@v2/health-units/health-unit/health-unit.model'

import apiRequest from '../../../api'

export type AddHealthUnitParams = HealthUnitModelConstructor

export async function addHealthUnit(params: AddHealthUnitParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/health-units',
    body: params,
  })
}
