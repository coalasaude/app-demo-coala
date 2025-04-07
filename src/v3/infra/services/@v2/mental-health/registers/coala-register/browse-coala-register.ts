import {
  MentalHealthCoalaRegisterBrowseModel,
  MentalHealthCoalaRegisterBrowseModelConstructor,
} from '@/v3/domain/@v2/mental-health/registers/coala-register/coala-register-browse.model'
import apiRequest from '@/v3/infra/services/api'

export type BrowseMentalHealthCoalaRegisterResponse =
  MentalHealthCoalaRegisterBrowseModelConstructor

export interface BrowseMentalHealthCoalaRegisterParams {
  userId: number
}

export async function browseMentalHealthCoalaRegister({
  userId,
}: BrowseMentalHealthCoalaRegisterParams) {
  const data = (await apiRequest<BrowseMentalHealthCoalaRegisterResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/mental-health/records/intern-records',
    pathParams: { userId },
  })) as BrowseMentalHealthCoalaRegisterResponse

  return new MentalHealthCoalaRegisterBrowseModel(data)
}
