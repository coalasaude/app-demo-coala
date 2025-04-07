import apiRequest from '../../../api'

import {
  ProfessionalReferenceBrowseModel,
  ProfessionalReferenceBrowseModelConstructor,
} from './../../../../../domain/@v2/users/professional-reference-browse.model'

type BrowseUserProfessionalReferenceResponse = ProfessionalReferenceBrowseModelConstructor

export interface BrowseUserProfessionalReferenceParams {
  userId: number
}

export async function browseProfessionalReference({
  userId,
}: BrowseUserProfessionalReferenceParams) {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/professional-references',
    pathParams: { userId },
  })) as BrowseUserProfessionalReferenceResponse

  return new ProfessionalReferenceBrowseModel({
    pagination: data.pagination,
    data: data.data,
  })
}
