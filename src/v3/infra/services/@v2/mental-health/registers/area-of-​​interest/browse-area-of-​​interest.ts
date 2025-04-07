import {
  MentalHealthAreaOfInterestBrowseModel,
  MentalHealthAreaOfInterestBrowseModelConstructor,
} from '@/v3/domain/@v2/mental-health/registers/area-of-​​interest/area-of-​​interest-browse.model'
import apiRequest from '@/v3/infra/services/api'

export type BrowseMentalHealthAreaOfInterestResponse =
  MentalHealthAreaOfInterestBrowseModelConstructor

export interface BrowseMentalHealthAreaOfInterestParams {
  userId: number
}

export async function browseMentalHealthAreaOfInterest({
  userId,
}: BrowseMentalHealthAreaOfInterestParams) {
  const data = (await apiRequest<BrowseMentalHealthAreaOfInterestResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/mental-health/records/interest-areas',
    pathParams: { userId },
  })) as BrowseMentalHealthAreaOfInterestResponse

  return new MentalHealthAreaOfInterestBrowseModel(data)
}
