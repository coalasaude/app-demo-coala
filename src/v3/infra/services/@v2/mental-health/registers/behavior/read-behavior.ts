import {
  MentalHealthBehaviorReadModel,
  MentalHealthBehaviorReadModelConstructor,
} from '@/v3/domain/@v2/mental-health/registers/behavior/behavior-read.model'
import apiRequest from '@/v3/infra/services/api'

export type ReadMentalHealthBehaviorResponse = MentalHealthBehaviorReadModelConstructor

export interface ReadMentalHealthBehaviorParams {
  userId: number
  id: number
}

export async function readMentalHealthBehavior({ id, userId }: ReadMentalHealthBehaviorParams) {
  const data = (await apiRequest<ReadMentalHealthBehaviorResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/mental-health/records/behaviour/:id',
    pathParams: { userId, id },
  })) as ReadMentalHealthBehaviorResponse

  return new MentalHealthBehaviorReadModel(data)
}
