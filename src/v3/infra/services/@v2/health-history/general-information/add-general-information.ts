import { BloodType } from '@/v3/presentation/enums/general-information.enum'

import apiRequest from '../../../api'

export interface AddGeneralInformationParams {
  userId: number
  bloodType: BloodType
}

export async function addGeneralInformation({ userId, ...body }: AddGeneralInformationParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/health-history/general-information',
    body,
    pathParams: { userId },
  })
}
