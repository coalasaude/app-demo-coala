import { BehaviorType } from '@/v3/domain/@v2/mental-health/enums/behavior-type.enum'

import apiRequest from '../../../../api'

export interface EditMentalHealthBehaviorParams {
  id: number
  type: BehaviorType
  userId: number
  title: string
  trigger: string
  description: string
}

export async function editMentalHealthBehavior({
  id,
  userId,
  title,
  ...body
}: EditMentalHealthBehaviorParams) {
  await apiRequest({
    method: 'PATCH',
    throwError: true,
    path: 'v2/users/:userId/mental-health/records/behaviour/:id',
    body: {
      ...body,
      name: title,
    },
    pathParams: { userId, id },
  })
}
