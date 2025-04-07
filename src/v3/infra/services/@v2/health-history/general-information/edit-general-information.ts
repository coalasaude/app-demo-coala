import { BloodType } from '@/v3/presentation/enums/general-information.enum'

import apiRequest from '../../../api'

export interface EditGeneralInformationParams {
  userId: number
  bloodType: BloodType
}

export async function editGeneralInformation({ userId, ...body }: EditGeneralInformationParams) {
  await apiRequest({
    method: 'PATCH',
    throwError: true,
    path: 'v2/users/:userId/health-history/general-information',
    body,
    pathParams: { userId },
  })
}
