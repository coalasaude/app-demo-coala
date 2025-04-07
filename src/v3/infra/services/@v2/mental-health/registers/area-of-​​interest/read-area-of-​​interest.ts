import { InterestAreaCategory } from '@/v3/domain/@v2/mental-health/enums/pedagogical-area-type.enum'
import {
  MentalHealthAreaOfInterestReadModel,
  MentalHealthAreaOfInterestReadModelConstructor,
} from '@/v3/domain/@v2/mental-health/registers/area-of-​​interest/area-of-​​interest-read.model'
import apiRequest from '@/v3/infra/services/api'

export type ReadMentalHealthAreaOfInterestResponse = MentalHealthAreaOfInterestReadModelConstructor

export interface ReadMentalHealthAreaOfInterestParams {
  userId: number
  id: number
  category: InterestAreaCategory
}

export async function readMentalHealthAreaOfInterest({
  id,
  userId,
  category,
}: ReadMentalHealthAreaOfInterestParams) {
  const data = (await apiRequest<ReadMentalHealthAreaOfInterestResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/mental-health/records/interest-areas/:category/:id',
    pathParams: { userId, id, category },
  })) as ReadMentalHealthAreaOfInterestResponse

  return new MentalHealthAreaOfInterestReadModel(data)
}
