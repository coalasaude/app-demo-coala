import {
  MentalHealthBehaviorBrowseModel,
  MentalHealthBehaviorBrowseModelConstructor,
} from '@/v3/domain/@v2/mental-health/registers/behavior/behavior-browse.model'
import apiRequest from '@/v3/infra/services/api'

export type BrowseMentalHealthBehaviorResponse = MentalHealthBehaviorBrowseModelConstructor

export interface BrowseMentalHealthBehaviorParams {
  userId: number
}

export async function browseMentalHealthBehavior({ userId }: BrowseMentalHealthBehaviorParams) {
  const data = (await apiRequest<BrowseMentalHealthBehaviorResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/mental-health/records/behaviour',
    pathParams: { userId },
  })) as BrowseMentalHealthBehaviorResponse

  return new MentalHealthBehaviorBrowseModel(data)
}
