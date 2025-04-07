import {
  GeneralInformationModel,
  GeneralInformationModelConstructor,
} from '@/v3/domain/@v2/health-history/general-information/general-information.model'

import apiRequest from '../../../api'

export type ReadGeneralInformationResponse = GeneralInformationModelConstructor

export interface ReadGeneralInformationParams {
  userId: number
}

export async function readGeneralInformation({ userId }: ReadGeneralInformationParams) {
  const data = (await apiRequest<ReadGeneralInformationResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/health-history/general-information',
    pathParams: { userId },
  })) as ReadGeneralInformationResponse

  if (!data) return null
  return new GeneralInformationModel(data)
}
