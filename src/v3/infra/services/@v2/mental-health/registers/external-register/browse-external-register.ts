import {
  MentalHealthExternalRegisterBrowseModel,
  MentalHealthExternalRegisterBrowseModelConstructor,
} from '@/v3/domain/@v2/mental-health/registers/external-register/external-register-browse.model'
import apiRequest from '@/v3/infra/services/api'

export type BrowseMentalHealthExternalRegisterResponse =
  MentalHealthExternalRegisterBrowseModelConstructor

export interface BrowseMentalHealthExternalRegisterParams {
  userId: number
}

export async function browseMentalHealthExternalRegister({
  userId,
}: BrowseMentalHealthExternalRegisterParams) {
  const data = (await apiRequest<BrowseMentalHealthExternalRegisterResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/mental-health/records/external-record',
    pathParams: { userId },
  })) as BrowseMentalHealthExternalRegisterResponse

  return new MentalHealthExternalRegisterBrowseModel(data)
}
