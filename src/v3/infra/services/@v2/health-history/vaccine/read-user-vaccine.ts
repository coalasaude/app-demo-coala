import {
  UserVaccineModel,
  UserVaccineModelConstructor,
} from '@/v3/domain/@v2/health-history/vaccine/user-vaccine.model'

import apiRequest from '../../../api'

export type ReadUserVaccineResponse = UserVaccineModelConstructor

export interface ReadUserVaccineParams {
  vaccineId: number
  userId: number
}

export async function readUserVaccine({ userId, vaccineId }: ReadUserVaccineParams) {
  const data = (await apiRequest<ReadUserVaccineResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/health-history/vaccine/:vaccineId',
    pathParams: { userId, vaccineId },
  })) as ReadUserVaccineResponse

  return new UserVaccineModel(data)
}
