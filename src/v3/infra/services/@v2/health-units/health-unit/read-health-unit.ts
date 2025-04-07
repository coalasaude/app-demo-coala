import {
  HealthUnitModel,
  HealthUnitModelConstructor,
} from '@/v3/domain/@v2/health-units/health-unit/health-unit.model'

import apiRequest from '../../../api'

type ReadHealthUnitResponse = HealthUnitModelConstructor

export type ReadHealthUnitParams = {
  healthUnitId: number
}

export async function readHealthUnit({ healthUnitId }: ReadHealthUnitParams) {
  const data = (await apiRequest<ReadHealthUnitResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/health-units/:healthUnitId',
    pathParams: { healthUnitId },
  })) as ReadHealthUnitResponse

  return new HealthUnitModel({
    id: data.id,
    status: data.status,
    type: data.type,
    contact: data.contact,
    company: data.company,
    appointment: data.appointment,
    financial: data.financial,
    infrastructure: data.infrastructure,
    address: data.address,
  })
}
