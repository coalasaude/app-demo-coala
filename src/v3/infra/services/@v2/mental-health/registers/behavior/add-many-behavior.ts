import { BehaviorType } from '@/v3/domain/@v2/mental-health/enums/behavior-type.enum'

import apiRequest from '../../../../api'

export interface AddManyMentalHealthBehaviorParams {
  userId: number
  behaviour: {
    type: BehaviorType
    name: string
    trigger?: string
    description?: string
  }[]
}

export async function addManyMentalHealthBehavior({
  userId,
  ...body
}: AddManyMentalHealthBehaviorParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/mental-health/records/behaviour',
    body: body,
    pathParams: { userId },
  })
}
