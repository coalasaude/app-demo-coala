import apiRequest from '@/services/api'
import {
  ReadInstitutionalPeiPdi,
  ReadInstitutionalPeiPdiConstructor,
} from '@/v3/domain/@v2/mental-health/learning/read-institutional-pei-pdi..model'

type Params = {
  institutionId: number
  userId: number
}

type ReadInstitutionalPeiPdiResponse = ReadInstitutionalPeiPdiConstructor

export async function readInstitutionalPeiPdi(params: Params) {
  const response = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/mental-health/:institutionId/information',
    pathParams: { userId: params.userId, institutionId: params.institutionId },
  })) as ReadInstitutionalPeiPdiResponse

  return new ReadInstitutionalPeiPdi(response)
}
