import {
  HealthInsuranceModel,
  HealthInsuranceModelConstructor,
} from '@/v3/domain/@v2/users/health-insurance.model'

import apiRequest from '../../../api'

type ReadUserHealthInsuranceResponse = HealthInsuranceModelConstructor

export interface ReadUserHealthInsuranceParams {
  healthInsuranceId: number
  userId: number
}

export async function readHealthInsurance({
  userId,
  healthInsuranceId,
}: ReadUserHealthInsuranceParams) {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/health-insurances/:healthInsuranceId',
    pathParams: { userId, healthInsuranceId },
  })) as ReadUserHealthInsuranceResponse

  return new HealthInsuranceModel(data)
}
