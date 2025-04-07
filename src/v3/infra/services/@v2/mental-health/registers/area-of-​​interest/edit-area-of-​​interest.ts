import { InterestAreaCategory } from '@/v3/domain/@v2/mental-health/enums/pedagogical-area-type.enum'

import apiRequest from '../../../../api'

export interface EditMentalHealthAreaOfInterestParams {
  id: number
  userId: number
  category: InterestAreaCategory
  title?: string
  interestSubjectIds?: number[]
  proficientSubjectIds?: number[]
  interests?: string
  proficients?: string
  observation?: string
}

const routeMap = {
  [InterestAreaCategory.ACADEMIC]: 'academic',
  [InterestAreaCategory.EXTRACURRICULAR]: 'extracurricular',
  [InterestAreaCategory.OTHERS]: 'other',
}

export async function editMentalHealthAreaOfInterest({
  id,
  userId,
  ...body
}: EditMentalHealthAreaOfInterestParams) {
  await apiRequest({
    method: 'PATCH',
    throwError: true,
    path: `v2/users/:userId/mental-health/records/interest-areas/${routeMap[body.category]}/:id`,
    body: {
      ...body,
      proficients: body.proficients || null,
      observation: body.observation || null,
    },
    pathParams: { userId, id },
  })
}
