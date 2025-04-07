import { InterestAreaCategory } from '@/v3/domain/@v2/mental-health/enums/pedagogical-area-type.enum'

import apiRequest from '../../../../api'

export interface DeleteMentalHealthAreaOfInterestParams {
  id: number
  userId: number
  category: InterestAreaCategory
}

export async function deleteMentalHealthAreaOfInterest({
  id,
  userId,
  category,
}: DeleteMentalHealthAreaOfInterestParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/users/:userId/mental-health/records/interest-areas/:category/:id',
    pathParams: { userId, id, category },
  })
}
