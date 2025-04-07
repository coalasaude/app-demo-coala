import {
  MentalHealthCoalaRegisterReadModel,
  MentalHealthCoalaRegisterReadModelConstructor,
} from '@/v3/domain/@v2/mental-health/registers/coala-register/coala-register-read.model'
import apiRequest from '@/v3/infra/services/api'

export type ReadMentalHealthCoalaRegisterResponse = MentalHealthCoalaRegisterReadModelConstructor

export interface ReadMentalHealthCoalaRegisterParams {
  userId: number
  id: number
}

export async function readMentalHealthCoalaRegister({
  id,
  userId,
}: ReadMentalHealthCoalaRegisterParams) {
  const data = (await apiRequest<ReadMentalHealthCoalaRegisterResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/mental-health/records/intern-records/:id',
    pathParams: { userId, id },
  })) as ReadMentalHealthCoalaRegisterResponse

  return new MentalHealthCoalaRegisterReadModel(data)
}
