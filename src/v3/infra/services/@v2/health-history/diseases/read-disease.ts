import {
  DiseaseModel,
  DiseaseModelConstructor,
} from '@/v3/domain/@v2/health-history/disease/disease.model'

import apiRequest from '../../../api'

export type ReadDiseaseResponse = DiseaseModelConstructor

export interface ReadDiseaseParams {
  diseaseId: number
  userId: number
}

export async function readDisease({ userId, diseaseId }: ReadDiseaseParams) {
  const data = (await apiRequest<ReadDiseaseResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/health-history/diseases/:diseaseId',
    pathParams: { userId, diseaseId },
  })) as ReadDiseaseResponse

  return new DiseaseModel(data)
}
