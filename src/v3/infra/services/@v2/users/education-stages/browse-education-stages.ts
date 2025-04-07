import {
  EducationalStageModel,
  EducationalStageModelConstructor,
} from '@/v3/domain/@v2/users/educational-stage.model'

import apiRequest from '../../../api'

type BrowseEducationalStageResponse = EducationalStageModelConstructor[]

export async function browseEducationalStage() {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/educational-stages',
  })) as BrowseEducationalStageResponse

  return data.map((item) => new EducationalStageModel(item))
}
