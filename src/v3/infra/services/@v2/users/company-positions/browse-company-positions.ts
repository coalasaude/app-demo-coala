import {
  CompanyPositionModel,
  CompanyPositionModelConstructor,
} from '@/v3/domain/@v2/users/company-position.model'

import apiRequest from '../../../api'

type BrowseCompanyPositionResponse = CompanyPositionModelConstructor[]

export async function browseCompanyPosition() {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/company-positions',
  })) as BrowseCompanyPositionResponse

  return data.map((item) => new CompanyPositionModel(item))
}
