import {
  MentalHealthExternalRegisterReadModel,
  MentalHealthExternalRegisterReadModelConstructor,
} from '@/v3/domain/@v2/mental-health/registers/external-register/external-register-read.model'
import apiRequest from '@/v3/infra/services/api'

export type ReadMentalHealthExternalRegisterResponse =
  MentalHealthExternalRegisterReadModelConstructor

export interface ReadMentalHealthExternalRegisterParams {
  userId: number
  id: number
}

export async function readMentalHealthExternalRegister({
  id,
  userId,
}: ReadMentalHealthExternalRegisterParams) {
  const data = (await apiRequest<ReadMentalHealthExternalRegisterResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/mental-health/records/external-record/:id',
    pathParams: { userId, id },
  })) as ReadMentalHealthExternalRegisterResponse

  return new MentalHealthExternalRegisterReadModel(data)
}
