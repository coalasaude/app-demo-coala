import {
  MentalHealthDifficultiesBrowseModel,
  MentalHealthDifficultiesBrowseModelConstructor,
} from '@/v3/domain/@v2/mental-health/registers/difficulties/difficulties-browse.model'
import apiRequest from '@/v3/infra/services/api'

export type BrowseMentalHealthDifficultiesResponse = MentalHealthDifficultiesBrowseModelConstructor

export interface BrowseMentalHealthDifficultiesParams {
  userId: number
}

export async function browseMentalHealthDifficulties({
  userId,
}: BrowseMentalHealthDifficultiesParams) {
  const data = (await apiRequest<BrowseMentalHealthDifficultiesResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/mental-health/records/challenge',
    pathParams: { userId },
  })) as BrowseMentalHealthDifficultiesResponse

  return new MentalHealthDifficultiesBrowseModel(data)
}
