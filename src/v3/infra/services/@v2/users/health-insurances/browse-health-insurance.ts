import {
  HealthInsuranceBrowseModel,
  HealthInsuranceBrowseModelConstructor,
} from '../../../../../domain/@v2/users/health-insurance-browse.model'
import apiRequest from '../../../api'

type BrowseUserHealthInsuranceResponse = HealthInsuranceBrowseModelConstructor

export interface BrowseUserHealthInsuranceParams {
  userId: number
}

export async function browseHealthInsurance({ userId }: BrowseUserHealthInsuranceParams) {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/health-insurances',
    pathParams: { userId },
  })) as BrowseUserHealthInsuranceResponse

  return new HealthInsuranceBrowseModel({
    pagination: data.pagination,
    data: data.data,
  })
}
