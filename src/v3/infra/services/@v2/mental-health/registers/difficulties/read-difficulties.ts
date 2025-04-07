import {
  MentalHealthDifficultiesReadModel,
  MentalHealthDifficultiesReadModelConstructor,
} from '@/v3/domain/@v2/mental-health/registers/difficulties/difficulties-read.model'
import apiRequest from '@/v3/infra/services/api'

export type ReadMentalHealthDifficultiesResponse = MentalHealthDifficultiesReadModelConstructor

export interface ReadMentalHealthDifficultiesParams {
  userId: number
  id: number
}

export async function readMentalHealthDifficulties({
  id,
  userId,
}: ReadMentalHealthDifficultiesParams) {
  const data = (await apiRequest<ReadMentalHealthDifficultiesResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/mental-health/records/challenge/:id',
    pathParams: { userId, id },
  })) as ReadMentalHealthDifficultiesResponse

  return new MentalHealthDifficultiesReadModel(data)
}
